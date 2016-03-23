var express = require('express')
  , bodyParser = require('body-parser')
  , app = express();

express.static('D:/projects/call-back');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

require('./routes/index')(app);

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test-api-fixture');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  app.listen(18000, function () {
    console.log('Example app listening on port 18000!');
  });
});
