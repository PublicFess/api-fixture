module.exports = function(app) {
  require('./operators')(app);
  require('./call')(app);
};
