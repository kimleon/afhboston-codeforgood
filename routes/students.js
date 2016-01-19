var express = require('express');
var router = express.Router();

var Terms = require('../mongoose/terms');
var Students = require('../mongoose/students');
var utils = require('../utils/utils');

var controller = require('../controller/students-controller');

// GET all students
router.get('/', function (req, res) {
    controller.getAllStudents(req, res);
});

// POST make a new student
router.post('/', function(req,res) {
    controller.createNewStudent(req, res);
});

module.exports = router;