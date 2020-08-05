"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var generateDiscussionSlug = require('../../utilities/tools').generateDiscussionSlug;

var getAllOpinions = require('../opinion/controller').getAllOpinions;

var getUser = require('../user/controller').getUser;

var Discussion = require('./model');

var Opinion = require('../opinion/model');
/**
 * get a single discussion
 * @param  {String} discussion_slug
 * @param  {String} discussion_id
 * @return {Promise}
 */


var getDiscussion = function getDiscussion(discussion_slug, discussion_id) {
  return new Promise(function (resolve, reject) {
    var findObject = {};
    if (discussion_slug) findObject.discussion_slug = discussion_slug;
    if (discussion_id) findObject._id = discussion_id;
    Discussion.findOne(findObject).populate('forum').populate('user').lean().exec(function (error, result) {
      if (error) {
        console.log(error);
        reject(error);
      } else if (!result) reject(null);else {
        // add opinions to the discussion object
        getAllOpinions(result._id).then(function (opinions) {
          result.opinions = opinions;
          resolve(result);
        }, function (error) {
          {
            console.log(error);
            reject(error);
          }
        });
      }
    });
  });
};
/**
 * Create a new discussion
 * @param  {Object} discussion
 * @return {Promise}
 */


var createDiscussion = function createDiscussion(discussion) {
  return new Promise(function (resolve, reject) {
    var newDiscussion = new Discussion({
      forum_id: discussion.forumId,
      forum: discussion.forumId,
      user_id: discussion.userId,
      user: discussion.userId,
      discussion_slug: generateDiscussionSlug(discussion.title),
      date: new Date(),
      title: discussion.title,
      content: discussion.content,
      favorites: [],
      tags: discussion.tags,
      pinned: discussion.pinned
    });
    newDiscussion.save(function (error) {
      if (error) {
        console.log(error);
        reject(error);
      }

      resolve(newDiscussion);
    });
  });
};
/**
 * toggle favorite status of discussion
 * @param  {ObjectId} discussion_id
 * @param  {ObjectId} user_id
 * @return {Promise}
 */


var toggleFavorite = function toggleFavorite(discussion_id, user_id) {
  return new Promise(function (resolve, reject) {
    Discussion.findById(discussion_id, function (error, discussion) {
      if (error) {
        console.log(error);
        reject(error);
      } else if (!discussion) reject(null);else {
        // add or remove favorite
        var matched = null;

        for (var i = 0; i < discussion.favorites.length; i++) {
          if (String(discussion.favorites[i]) === String(user_id)) {
            matched = i;
          }
        }

        if (matched === null) {
          discussion.favorites = [].concat((0, _toConsumableArray2["default"])(discussion.favorites), [user_id]);
        } else {
          discussion.favorites = [].concat((0, _toConsumableArray2["default"])(discussion.favorites.slice(0, matched)), (0, _toConsumableArray2["default"])(discussion.favorites.slice(matched + 1, discussion.favorites.length)));
        }

        discussion.save(function (error, updatedDiscussion) {
          if (error) {
            console.log(error);
            reject(error);
          }

          resolve(updatedDiscussion);
        });
      }
    });
  });
};

var updateDiscussion = function updateDiscussion(forum_id, discussion_slug) {// TODO: implement update feature
};

var deleteDiscussion = function deleteDiscussion(discussion_slug) {
  return new Promise(function (resolve, reject) {
    // find the discussion id first
    Discussion.findOne({
      discussion_slug: discussion_slug
    }).exec(function (error, discussion) {
      if (error) {
        console.log(error);
        reject(error);
      } // get the discussion id


      var discussion_id = discussion._id; // remove any opinion regarding the discussion

      Opinion.remove({
        discussion_id: discussion_id
      }).exec(function (error) {
        if (error) {
          console.log(error);
          reject(error);
        } // finally remove the discussion
        else {
            Discussion.remove({
              discussion_slug: discussion_slug
            }).exec(function (error) {
              if (error) {
                console.log(error);
                reject(error);
              } else {
                resolve({
                  deleted: true
                });
              }
            });
          }
      });
    });
  });
};

module.exports = {
  getDiscussion: getDiscussion,
  createDiscussion: createDiscussion,
  updateDiscussion: updateDiscussion,
  deleteDiscussion: deleteDiscussion,
  toggleFavorite: toggleFavorite
};
//# sourceMappingURL=controller.js.map