var express = require('express');
var router = express.Router();

var Terms = require('../mongoose/terms');
var Students = require('../mongoose/students');
var utils = require('../utils/utils');

var controller = require('../controllers/terms-controller');

// GET all terms
router.get('/', function (req, res) {
  controller.getAllTerms(req, res);
});

// POST make a new term
router.post('/', function(req, res) {
  controller.createNewTerm(req, res);
});

module.exports = router;