var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var operatorSchema = Schema({
  name: {
    type: 'String',
    require: true
  }
});

var Operator = mongoose.model('Operator', operatorSchema);
module.exports = Operator;
