/**
 * module dependencies for express configuration
 */
const morgan = require('morgan');
const bodyParser = require('body-parser');

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
