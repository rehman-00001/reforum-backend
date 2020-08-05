"use strict";

// forum controllers
var getAllForums = require('./controller').getAllForums;

var getDiscussions = require('./controller').getDiscussions;
/**
 * forum apis
 */


var forumAPI = function forumAPI(app) {
  // get all forums
  app.get('/api/forum', function (req, res) {
    getAllForums().then(function (result) {
      console.log('forums: ', result);
      res.send(result);
    }, function (error) {
      res.send(error);
    });
  }); // get discussions of a forum

  app.get('/api/forum/:forum_id/discussions', function (req, res) {
    getDiscussions(req.params.forum_id, false).then(function (result) {
      res.send(result);
    }, function (error) {
      res.send([]);
    });
  });
};

module.exports = forumAPI;
//# sourceMappingURL=api.js.map