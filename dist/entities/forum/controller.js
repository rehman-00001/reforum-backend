"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var asyncEach = require('async/each'); // models


var Forum = require('./model');

var Discussion = require('../discussion/model'); // controllers


var getAllOpinions = require('../opinion/controller').getAllOpinions;

var getUser = require('../user/controller').getUser;
/**
 * get all forums list
 * @type {Promise}
 */


var getAllForums = function getAllForums() {
  return new Promise(function (resolve, reject) {
    Forum.find({}).exec(function (error, results) {
      if (error) {
        reject(error);
      } else if (!results) reject(null);else {
        resolve(results);
      }
    });
  });
};
/**
 * get discussions of a forum
 * @param  {ObjectId} forum_id
 * @param  {Boolean} pinned
 * @return {Promise}
 */


var getDiscussions = function getDiscussions(forum_id, pinned) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(resolve, reject) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // match discussion id and pinned status
              console.log('forumid: ' + forum_id);
              Discussion.find({
                forum_id: forum_id
              }).populate('forum').populate('user').lean().exec(function (error, discussions) {
                if (error) {
                  console.error(error);
                  reject(error);
                } else if (!discussions) {
                  reject(null);
                } else {
                  console.log('Discussions count: ' + discussions.length); // attach opinion count to each discussion

                  asyncEach(discussions, function (eachDiscussion, callback) {
                    // add opinion count
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
                      console.error(error);
                      reject(error);
                    } else resolve(discussions);
                  });
                }
              });

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

module.exports = {
  getAllForums: getAllForums,
  getDiscussions: getDiscussions
};
//# sourceMappingURL=controller.js.map