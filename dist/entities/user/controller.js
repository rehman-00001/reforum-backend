"use strict";

var _ = require('lodash');

var asyncEach = require('async/each'); // controllers


var getAllOpinions = require('../opinion/controller').getAllOpinions; // models


var User = require('./model');

var Discussion = require('../discussion/model');

var Opinion = require('../opinion/model');
/**
 * get user doc by user id
 * @param  {ObjectId} user_id
 * @return {promise}
 */


var getUser = function getUser(user_id) {
  return new Promise(function (resolve, reject) {
    User.findOne({
      _id: user_id
    }, function (error, user) {
      if (error) {
        console.log(error);
        reject(error);
      } else if (!user) reject(null);else resolve(user);
    });
  });
};
/**
 * get the full profile of a user
 * @param  {String} username
 * @return {Promise}
 */


var getFullProfile = function getFullProfile(username) {
  return new Promise(function (resolve, reject) {
    User.findOne({
      username: username
    }).lean().exec(function (error, result) {
      if (error) {
        console.log(error);
        reject(error);
      } else if (!result) reject('not_found');else {
        // we got the user, now we need all discussions by the user
        Discussion.find({
          user_id: result._id
        }).populate('forum').lean().exec(function (error, discussions) {
          if (error) {
            console.log(error);
            reject(error);
          } else {
            // we got the discussions by the user
            // we need to add opinion count to each discussion
            asyncEach(discussions, function (eachDiscussion, callback) {
              getAllOpinions(eachDiscussion._id).then(function (opinions) {
                // add opinion count to discussion doc
                eachDiscussion.opinion_count = opinions ? opinions.length : 0;
                callback();
              }, function (error) {
                console.error(error);
                callback(error);
              });
            }, function (error) {
              if (error) {
                console.log(error);
                reject(error);
              } else {
                result.discussions = discussions;
                resolve(result);
              }
            });
          }
        });
      }
    });
  });
};

module.exports = {
  getUser: getUser,
  getFullProfile: getFullProfile
};
//# sourceMappingURL=controller.js.map