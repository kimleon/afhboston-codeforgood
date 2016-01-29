var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var termSchema = Schema({
    schoolYear: {type: String, required: true},
    period: {type: String, required: true},
});

var Term = mongoose.model('Term', termSchema);

module.exports = mongoose.model('Term', termSchema);