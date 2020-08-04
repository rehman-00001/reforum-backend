if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');

// server configurations
const serverConfigs = require('./config/serverConfig');

// connect to database
console.log('DB URL:', serverConfigs.DBURL);
mongoose
  .connect(serverConfigs.DBURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true,
  })
  .then((s) => console.log('db connections success'))
  .catch((e) => console.log(e));

// initialize express
const app = express();

// apply express configs
require('./express')(app, serverConfigs);

// fire up the server
app.listen(serverConfigs.PORT, (error) => {
  if (error) throw error;
  console.log('Server running on port: ' + serverConfigs.PORT);
});
