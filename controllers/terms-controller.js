var express = require('express');
var router = express.Router();

var Terms = require('../mongoose/terms');
var Students = require('../mongoose/students');
var utils = require('../utils/utils');

var controller = function() {
  return {
    /* make new term */
    createNewTerm: function(req, res) {
      var newTerm = new Terms(req.body);
      newTerm.save(function(err,doc) {
        if (err) {
          utils.sendErrResponse(res, 500, 'An unexpected error occured.');
        } else {
          utils.sendSuccessResponse(res);
        }
      });
    },

    /* get all terms */
    getAllTerms: function(req, res) {
      Terms.find({}, function(err,courses) {
        if (err) {
          utils.sendErrResponse(res, 500, 'An unexpected error occured.');
        } else {
          res.json(courses);
        }
      });
    },

    /* get term info */
    getTermInfo: function(req, res) {
      Terms.findOne({"_id": req.params.id}, function(err, term){
        if(err || term == null) {
          utils.sendErrResponse(res, 404, 'The term could not be found.');
        } else {
          res.json(term);
        }
      });
    },

    /* add student to term */
    addStudentToTerm: function(req, res) {
      Terms.findOneAndUpdate({
        "_id": req.params.id
        }, {
          $push: {students: req.params.studentId},
        }, function(err, doc) {
          if (err) {
            utils.sendErrResponse(res, 500, 'An unknown error occurred.');
          } else {
            utils.sendSuccessResponse(res);
          }
        }
      );
    },

    /* delete term */
    deleteTerm: function(req, res) {
      Terms.remove({"_id": req.params.id}, function(err, docs) {
        if (err) {
          utils.sendErrResponse(res, 500, 'An unknown error occurred.');
        } else {
          utils.sendSuccessResponse(res);
        }
      });
    },

  }
};

module.exports = controller();