"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var checkAuth = require('./../../utilities/check-auth'); // discussion controllers


var getDiscussion = require('./controller').getDiscussion;

var createDiscussion = require('./controller').createDiscussion;

var toggleFavorite = require('./controller').toggleFavorite;

var deleteDiscussion = require('./controller').deleteDiscussion;
/**
 * discussion apis
 */


var discussionAPI = function discussionAPI(app) {
  // get signle discussion
  app.get('/api/discussion/:discussion_slug', function (req, res) {
    var discussion_slug = req.params.discussion_slug;
    getDiscussion(discussion_slug).then(function (result) {
      res.send(result);
    }, function (error) {
      res.send(error);
    });
  }); // toggle favorite to the discussion

  app.put('/api/discussion/toggleFavorite/:discussion_id', function (req, res) {
    var discussion_id = req.params.discussion_id;

    if (checkAuth(req)) {
      console.log('userId: ', req.userId);
      console.log('discussionId: ', discussion_id);
      toggleFavorite(discussion_id, req.userId).then(function (result) {
        return getDiscussion(result.discussion_slug).then(function (result) {
          return res.send(result);
        }, function (error) {
          return res.send({
            discussionUpdated: false
          });
        });
      }, function (error) {
        return res.send({
          discussionUpdated: false
        });
      });
    } else {
      res.send({
        discussionUpdated: false
      });
    }
  }); // create a new discussion

  app.post('/api/discussion/newDiscussion', function (req, res) {
    if (checkAuth(req)) {
      createDiscussion(req.body).then(function (result) {
        res.send((0, _extends2["default"])({}, result._doc, {
          postCreated: true
        }));
      }, function (error) {
        res.send({
          postCreated: false
        });
      });
    } else {
      res.send({
        postCreated: false
      });
    }
  }); // delete a discussion

  app["delete"]('/api/discussion/deleteDiscussion/:discussion_slug', function (req, res) {
    if (checkAuth(req)) {
      deleteDiscussion(req.params.discussion_slug).then(function (result) {
        res.send({
          deleted: true
        });
      }, function (error) {
        res.send({
          deleted: false
        });
      });
    } else {
      res.send({
        deleted: false
      });
    }
  });
};

module.exports = discussionAPI;
//# sourceMappingURL=api.js.map