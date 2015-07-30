var app = require('./server-config.js');
var port = process.env.PORT || 4568;
var mongoose = require('mongoose');

var config = require('./config.js').get(process.env.NODE_ENV);

mongoose.connect(config.database, function(err) {
  if (err) {
    throw err;
  }
  app.listen(port, function(err) {
    if (err) {
      throw err;
    }
    console.log('Server now listening on port ' + port);
  });
})


