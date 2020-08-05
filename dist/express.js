"use strict";

/**
 * module dependencies for express configuration
 */
var morgan = require('morgan');

var bodyParser = require('body-parser');
/**
 * express configuration
 */


var expressConfig = function expressConfig(app, serverConfigs) {
  // log server requests to console
  !serverConfigs.PRODUCTION && app.use(morgan('dev')); // get data from html froms

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  })); // apply route configs

  require('./routes')(app);
};

module.exports = expressConfig; // "babel-core": "^7.0.0-bridge.0",
//# sourceMappingURL=express.js.map