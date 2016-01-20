var express = require('express');
var router = express.Router();

var Terms = require('../mongoose/terms');
var Students = require('../mongoose/students');
var utils = require('../utils/utils');

var controller = function() {
  return {
    /* get all students */
    getAllStudents: function(req, res) {
      Students.find({}, function(err, students) {
        if (err) {
          utils.sendErrResponse(res, 500, 'An unexpected error occured.');
        } else {
          res.json(students);
        }
      });
    },

    /* make a new student */
    createNewStudent: function(req, res) {
      var newStudent = new Students(req.body);
      newStudent.save(function(err, doc) {
        if (err) {
          utils.sendErrResponse(res, 500, 'An unexpected error occured.');
        } else {
          utils.sendSuccessResponse(res);
        }
      });
    }
  }
};

module.exports = controller();