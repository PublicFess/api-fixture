var path = require('path')
, request = require('request')
, fs = require('fs')
, async = require('async');

var Fixture = function(pathToFixture, server) {
  var fixture = {
    workingDir: path.join(process.cwd(), pathToFixture),
    server: server,
    models: []
  };
  fixture.init = function() {
    var self = this;
    self.mappingFixtures(self.workingDir);
  };

  fixture.mappingFixtures = function(dir) {
    var self = this;
    var dirs = fs.readdirSync(dir);
    dirs.forEach(function(item) {
      var file = path.join(dir, item);
      var stat = fs.statSync(file);
      if (stat.isFile()) {
        var text = fs.readFileSync(file, 'utf-8');
        self.models.push(JSON.parse(text));
      } else if (stat.isDirectory()) {
        self.mappingFixtures(file);
      }
    });
  };

  fixture.init();

  fixture.delete = function(cb) {
    var self = this;
    async.each(self.models, function(model, cb) {
      var url = self.server.host + model.url;
      request(url, function(err, res, body) {
        async.each(JSON.parse(body), function(item, cb) {
          var id = item.id || item._id;
          request.del(url + '/' + id, cb);
        }, cb);
      });
    }, cb);
  };

  fixture.create = function(cb) {
    var self = this;
    self.delete(function(err) {
      if (err) cb(err);
      async.each(self.models, function(model, cb) {
        var url = self.server.host + model.url;
        async.each(model.data, function(item, cb) {
          request.post(url, item, cb);
        }, cb);
      }, cb);
    });
  };
  return fixture;
};

module.exports = Fixture;
