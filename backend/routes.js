const userAPI = require('./entities/user/api');
const forumAPI = require('./entities/forum/api');
const discussionAPI = require('./entities/discussion/api');
const opinionAPI = require('./entities/opinion/api');

/**
 * routes configurations
 */
const routesConfig = (app) => {
  app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Methods',
      'PUT, GET, POST, DELETE, PATCH, OPTIONS'
    );
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });

  // serve api endpoint
  app.get('/api', (req, res) => {
    res.send('Hello from API endpoint');
  });

  // apply user apis
  userAPI(app);

  // apply forum apis
  forumAPI(app);

  // apply discussion apis
  discussionAPI(app);

  // apply opinion apis
  opinionAPI(app);
};

module.exports = routesConfig;
