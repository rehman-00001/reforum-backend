"use strict";

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var express = require('express');

var mongoose = require('mongoose'); // server configurations


var serverConfigs = require('./config/serverConfig'); // connect to database


console.log('DB URL:', serverConfigs.DBURL);
mongoose.connect(serverConfigs.DBURL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: true
}).then(function (s) {
  return console.log('db connections success');
})["catch"](function (e) {
  return console.log(e);
}); // initialize express

var app = express(); // apply express configs

require('./express')(app, serverConfigs); // fire up the server


app.listen(serverConfigs.PORT, function (error) {
  if (error) throw error;
  console.log('Server running on port: ' + serverConfigs.PORT);
});
//# sourceMappingURL=server.js.map