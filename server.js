// modules for server
const express = require('express');
const mongoose = require('mongoose');

// server configurations
const serverConfigs = require('./config/serverConfig');

// connect to database
mongoose.connect(serverConfigs.DBURL);

// initialize express
const app = express();

// apply express configs
require('./backend/express')(app, serverConfigs);

// fire up the server
app.listen(serverConfigs.PORT, (error) => {
  if (error) throw error;
  console.log('Server running on port: ' + serverConfigs.PORT);
});
