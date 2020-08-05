"use strict";

var userAPI = require('./entities/user/api');

var forumAPI = require('./entities/forum/api');

var discussionAPI = require('./entities/discussion/api');

var opinionAPI = require('./entities/opinion/api');
/**
 * routes configurations
 */


var routesConfig = function routesConfig(app) {
  app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Credentials', true);
    next();
  }); // serve api endpoint

  app.get('/api', function (req, res) {
    res.send('Hello from API endpoint');
  }); // apply user apis

  userAPI(app); // apply forum apis

  forumAPI(app); // apply discussion apis

  discussionAPI(app); // apply opinion apis

  opinionAPI(app);
};

module.exports = routesConfig;
//# sourceMappingURL=routes.js.map