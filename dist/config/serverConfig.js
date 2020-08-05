"use strict";

/**
 * module dependencies for server configuration
 */
var path = require('path');
/**
 * server configurations
 */


var serverConfigs = {
  PRODUCTION: process.env.NODE_ENV === 'production',
  PORT: process.env.PORT || 8080,
  DBURL: process.env.DBURL,
  ROOT: path.resolve(__dirname, '..'),
  JWT_KEY: process.env.JWT_KEY
};
module.exports = serverConfigs;
//# sourceMappingURL=serverConfig.js.map