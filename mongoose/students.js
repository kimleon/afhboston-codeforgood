var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = Schema({
    participantID: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    schoolID: {type: String, required: true},
    school: {type: String, required: true},
    schoolCode: {type: String, required: true},
    courseNames: [{type: String, required: true}],
    levels: [{type: String, required: true}],
    grades: [{type: String, required: true}],
    classCategories: [{type: String, required: true}],
});

var Student = mongoose.model('Student', studentSchema);

module.exports = mongoose.model('Student', studentSchema);