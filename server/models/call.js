var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var callSchema = Schema({
  clientName: {
    type: 'String',
    require: true
  },
  phone: {
    type: 'String',
    require: true
  },
  lastOrderAt: {
    type: 'Date'
  },
  callAt: {
    type: 'Date'
  },
  operator: {
    type: Schema.ObjectId,
    ref: 'Operator',
    require: true
  },
  comment: {
    type: 'String'
  }
});

var Call = mongoose.model('Call', callSchema);
module.exports = Call;
