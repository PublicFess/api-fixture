var assert = require('assert')
  , request = require('request')
, Fixture = require('../index')
, server = {
  host: 'http://localhost:18000'
};

var fixture = new Fixture('/test/fixtures/simple', server);

describe('Array', function() {
  it('should create simple fixture', function (done) {
    fixture.create(function() {
      request(server.host + '/operators', function(err, res, body) {
        assert.equal(JSON.parse(body).length, 3);
        done();
      });
    });
  });
  it('should clean and create simple fixture', function (done) {
    fixture.create(function() {
      request(server.host + '/operators', function(err, res, body) {
        assert.equal(JSON.parse(body).length, 3);
        done();
      });
    });
  });
  it('should delete', function (done) {
    fixture.delete(function() {
      request(server.host + '/operators', function(err, res, body) {
        assert.equal(JSON.parse(body).length, 0);
        done();
      });
    });
  });
});
