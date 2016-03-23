var Operator = require('../models/operator');

module.exports = function(app) {
  app.get('/operators', function(req, res, next) {
    Operator.find().exec(function(err, operators) {
      if (err) return next(err);
      res.json(operators);
    });
  });

  app.post('/operators', function(req, res, next) {
    var operator = new Operator(req.body);
    operator.save(function(err) {
      if (err) return next(err);
      res.json(operator);
    });
  });

  app.delete('/operators/:id', function(req, res, next) {
    console.log(req.params.id);
    Operator.remove({
      _id: req.params.id
    }).exec(function(err, item) {
      if (err) return next(err);
      res.json(item);
    });
  });
};
