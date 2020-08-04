/**
 * module dependencies for express configuration
 */
const passport = require('passport');
const morgan = require('morgan');
const compress = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const session = require('express-session');
// const mongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');

/**
 * express configuration
 */
const expressConfig = (app, serverConfigs) => {
  // log server requests to console
  !serverConfigs.PRODUCTION && app.use(morgan('dev'));

  // get data from html froms
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // apply route configs
  require('./routes')(app);
};

module.exports = expressConfig;
