var Call = require('../models/call');

module.exports = function(app) {
  app.get('/call', function(req, res, next) {
    Call.find().exec(function(err, call) {
      if (err) return next(err);
      res.json(call);
    });
  });

  app.post('/call', function(req, res, next) {
    var call = new Call(req.body);
    call.callAt = new Date();
    call.save(function(err) {
      if (err) return next(err);
      res.json(call);
    });
  });

  app.delete('/call/:id', function(req, res, next) {
    Call.remove({
      _id: req.params.id
    }).exec(function(err, item) {
      if (err) return next(err);
      res.json(item);
    });
  });
};
