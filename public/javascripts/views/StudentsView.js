window.StudentsView = Backbone.View.extend({
  initialize: function(options) {
    this.student = {
      participantID: "1",
      firstName: "Hello",
      lastName: "World",
      schoolID: "2",
      school: "MIT",
      schoolCode: "3",
      courseNames: ["Bio AP", "CS"],
      levels: ["AP", "regular"],
      grades: ["A", "B"],
      classCategories: ["Science", "Elective"],
    };
    this.render();
  },

  render: function() {
    $(this.el).html(this.template({student:this.student}));
    return this;
  },

  events: {
    "click #new-student-button": "newStudent",
    "click #update-student-button": "updateStudent",
  },

  /* Button click functions */

  newStudent: function(e) {
    var firstName = $("#student-first-name", $(this.el)).val();
    var lastName = $("#student-last-name", $(this.el)).val();
    var school = $("#student-school", $(this.el)).val();

    // Get participantID from students dictionary
    var participantID = "1";

    // Get schoolID and schoolCode from school dictionary
    var schoolID = "2";
    var schoolCode = "3";

    //Get courseNames from OCR
    var courseNames = ["Advanced Placement Biology", "English Honors", "Computer Science"];

    var levels = [];
    var classCategories = [];

    var courseName = "";
    var level = "";
    var classCategory = "";
    for (var i = 0; i < courseNames.length; i++) {
      courseName = courseNames[i].toLowerCase();
      level = this.findLevel(courseName);
      classCategory = this.categorizeClass(courseName);

      levels.push(level);
      classCategories.push(classCategory);
    }

    var self = this;
    if (firstName == "") {
      $("#new-student-errors", $(this.el)).text("Please enter the first name.");
    } else if (lastName == "") {
      $("#new-student-errors", $(this.el)).text("Please enter the last name.");
    } else if (participantID == "") {
      $("#new-student-errors", $(this.el)).text("Student is not in participant directory.");
    } else if (school == "") {
      $("#new-student-errors", $(this.el)).text("Please enter the school.");
    } else if (schoolID == "" || schoolCode == "") {
      $("#new-student-errors", $(this.el)).text("School is not in school directory.");
    } else if (courseNames.length != levels.length || courseNames.length != classCategories.length) {
      $("#new-student-errors", $(this.el)).text("Something went wrong on our end.");
    } else {
      $.ajax({
        url: "/students",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
          participantID: participantID,
          firstName: firstName,
          lastName: lastName,
          schoolID: schoolID,
          school: school,
          schoolCode: schoolCode,
          courseNames: courseNames,
          levels: levels,
          classCategories: classCategories,
        }),
        success: function () {
          // TODO: need to add student to term

          // TODO: change navigating route
          Backbone.history.navigate("/");
          window.location.reload();
        },
        error: function (xhr, status, err) {
          $("#new-student-errors", $(self.el)).text(err);
        }
      });
    }

  },

  updateStudent: function() {

  },

  findLevel: function(courseName) {
    if (courseName.indexOf('advanced placement') > -1) {
      return "AP";
    } else if (courseName.indexOf('honors') > -1) {
      return "Honors";
    } else {
      return "Regular";
    }
  },

  categorizeClass: function(courseName) {
    var ARTS = [];
    var ENGLISH = [];
    var FOREIGN_LANG = [];
    var HISTORY = [];
    var MATH = [];
    var SCIENCE = [];

    for (var i = 0; i < ARTS; i++) {
      if (courseName.indexOf(ARTS[i]) > -1) {
        return "Arts";
      }
    }
    for (var i = 0; i < ENGLISH; i++) {
      if (courseName.indexOf(ENGLISH[i]) > -1) {
        return "English";
      }
    }
    for (var i = 0; i < FOREIGN_LANG; i++) {
      if (courseName.indexOf(FOREIGN_LANG[i]) > -1) {
        return "Foreign Language";
      }
    } 
    for (var i = 0; i < HISTORY; i++) {
      if (courseName.indexOf(HISTORY[i]) > -1) {
        return "History";
      }
    }
    for (var i = 0; i < MATH; i++) {
      if (courseName.indexOf(MATH[i]) > -1) {
        return "Math";
      }
    }
    for (var i = 0; i < SCIENCE; i++) {
      if (courseName.indexOf(SCIENCE[i]) > -1) {
        return "Science";
      }
    }
    return "Elective";
  },
});