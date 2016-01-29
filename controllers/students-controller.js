var express = require('express');
var router = express.Router();

var Terms = require('../mongoose/terms');
var Students = require('../mongoose/students');
var utils = require('../utils/utils');

var controller = function() {
  return {
    /* make new student */
    createNewStudent: function(req, res) {
      var newStudent = new Students(req.body);
      newStudent.save(function(err, doc) {
        if (err) {
          utils.sendErrResponse(res, 500, 'An unexpected error occured.');
        } else {
          utils.sendSuccessResponse(res);
        }
      });
    },

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

    /* get student info */
    getStudentInfo: function(req, res) {
      Students.findOne({"_id": req.params.id}, function(err, student){
        if(err || student == null) {
          utils.sendErrResponse(res, 404, 'The student could not be found.');
        } else {
          res.json(student);
        }
      });
    },

    /* delete all students */
    deleteAllStudents: function(req, res) {
      Students.remove({}, function(err, docs) {
        if (err) {
          utils.sendErrResponse(res, 500, 'An unknown error occurred.');
        } else {
          utils.sendSuccessResponse(res);
        }
      });
    },

    /* delete student */
    deleteStudent: function(req, res) {
      Students.remove({"_id": req.params.id}, function(err, docs) {
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