var express = require('express');
var router = express.Router();

var Terms = require('../mongoose/terms');
var Students = require('../mongoose/students');
var utils = require('../utils/utils');

var controller = require('../controllers/terms-controller');


// POST new term
router.post('/', function(req, res) {
  controller.createNewTerm(req, res);
});

// GET all terms
router.get('/', function(req, res) {
  controller.getAllTerms(req, res);
});

// GET term
router.get('/:id', function(req, res) {
  controller.getTermInfo(req, res);
});

// PUT add student to term
router.put('/:id/:studentId', function(req, res) {
  controller.addStudentToTerm(req, res);
});

// DELETE term
router.delete('/:id', function(req, res) {
  controller.deleteTerm(req, res);
});


module.exports = router;