"use strict";

// models
var Opinion = require('./model');
/**
 * get all opinion regarding a single discussion
 * @param  {ObjectId} discussion_id
 * @return {Promise}
 */


var getAllOpinions = function getAllOpinions(discussion_id) {
  return new Promise(function (resolve, reject) {
    Opinion.find({
      discussion_id: discussion_id
    }).populate('user').sort({
      date: -1
    }).exec(function (error, opinions) {
      if (error) {
        console.log(error);
        reject(error);
      } else if (!opinions) reject(null);else resolve(opinions);
    });
  });
};
/**
 * create an opinion regarding a discussion
 * @param  {ObjectId} forum_id
 * @param  {ObjectId} discussion_id
 * @param  {ObjectId} user_id
 * @param  {Object} content
 * @return {Promise}
 */


var createOpinion = function createOpinion(_ref) {
  var forum_id = _ref.forum_id,
      discussion_id = _ref.discussion_id,
      user_id = _ref.user_id,
      content = _ref.content;
  return new Promise(function (resolve, reject) {
    var newOpinion = new Opinion({
      forum_id: forum_id,
      discussion_id: discussion_id,
      discussion: discussion_id,
      user_id: user_id,
      user: user_id,
      content: content,
      date: new Date()
    });
    newOpinion.save(function (error) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(newOpinion);
      }
    });
  });
};

var updateOpinion = function updateOpinion(opinion_id) {// TODO: implement update for opinion
};
/**
 * delete a single opinion
 * @param  {ObjectId} opinion_id
 * @return {Promise}
 */


var deleteOpinion = function deleteOpinion(opinion_id) {
  return new Promise(function (resolve, reject) {
    Opinion.remove({
      _id: opinion_id
    }).exec(function (error) {
      if (error) {
        console.log(error);
        reject(error);
      } else resolve('deleted');
    });
  });
};

module.exports = {
  getAllOpinions: getAllOpinions,
  createOpinion: createOpinion,
  updateOpinion: updateOpinion,
  deleteOpinion: deleteOpinion
};
//# sourceMappingURL=controller.js.map