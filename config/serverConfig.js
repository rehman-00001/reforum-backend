/**
 * module dependencies for server configuration
 */
const path = require('path');

/**
 * server configurations
 */
const serverConfigs = {
  PRODUCTION: process.env.NODE_ENV === 'production',
  PORT: process.env.PORT || 8080,
  DBURL: process.env.DBURL,
  ROOT: path.resolve(__dirname, '..'),
  JWT_KEY: 'SuperSecretKey',
};

module.exports = serverConfigs;
