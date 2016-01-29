var express = require('express');
var router = express.Router();

var Terms = require('../mongoose/terms');
var Students = require('../mongoose/students');
var utils = require('../utils/utils');

var controller = require('../controllers/students-controller');


// POST new student
router.post('/', function(req, res) {
    controller.createNewStudent(req, res);
});

// GET all students
router.get('/', function(req, res) {
    controller.getAllStudents(req, res);
});

// GET student
router.get('/:id', function(req, res) {
  controller.getStudentInfo(req, res);
});

// DELETE all students
router.delete('/', function(req, res) {
  controller.deleteAllStudents(req, res);
});

// DELETE student
router.delete('/:id', function(req, res) {
  controller.deleteStudent(req, res);
});


module.exports = router;