var express = require('express');
var router = express.Router();

var Terms = require('../mongoose/terms');
var Students = require('../mongoose/students');
var utils = require('../utils/utils');

var controller = function(){
    return {
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

        /* make a new term */
        createNewTerm: function(req, res) {
            var newTerm = new Terms(req.body);
            newTerm.save(function(err,doc) {
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