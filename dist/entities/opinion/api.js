"use strict";

var checkAuth = require('../../utilities/check-auth'); // controllers


var getAllOpinions = require('./controller').getAllOpinions;

var createOpinion = require('./controller').createOpinion;

var deleteOpinion = require('./controller').deleteOpinion;
/**
 * opinion apis
 */


var opinionAPI = function opinionAPI(app) {
  // create an opinion
  app.post('/api/opinion/newOpinion', function (req, res) {
    if (checkAuth(req)) {
      createOpinion(req.body).then(function (result) {
        res.send(result);
      }, function (error) {
        res.send(error);
      });
    } else {
      res.send({
        authenticated: false
      });
    }
  }); // remove an opinion

  app["delete"]('/api/opinion/deleteOpinion/:opinion_id', function (req, res) {
    if (checkAuth(req)) {
      deleteOpinion(req.params.opinion_id).then(function (result) {
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

module.exports = opinionAPI;
//# sourceMappingURL=api.js.map