window.StudentsView = Backbone.View.extend({
  initialize: function(options) {
    this.schoolYear = options.schoolYear;
    this.period = options.period;
    this.studentSize = options.studentSize;
    this.studentMap = options.studentMap;
    this.schoolMap = options.schoolMap;
    this.studentIDMap = options.studentIDMap;
    this.render();
  },

  render: function() {
    $(this.el).html(this.template({schoolYear: this.schoolYear, period: this.period,
      studentSize: this.studentSize, schools: Object.keys(this.schoolMap)}));
    return this;
  },

  events: {
    "click #restart-button": "restart",
    "click #new-student-button": "newStudent",
    "click #update-student-button": "updateStudent",
    "click #download-term-button": "downloadTerm",
  },

  /* Button click functions */

  restart: function(e) {
    e.preventDefault();

    $.ajax({
      type: "DELETE",
      url: "/students/",
      success: function() {
        $.ajax({
          type: "DELETE",
          url: "/terms/",
          success: function() {
            $('#content').html(new TermsView().el);
          }, error: function(xhr, status, err) {
            $("#restart-errors", $(this.el)).text("Something went wrong on our end.");
            $("#restart-errors", $(self.el)).text(err);
          }
        })
      }, error: function(xhr, status, err) {
        $("#restart-errors", $(this.el)).text("Something went wrong on our end.");
        $("#restart-errors", $(self.el)).text(err);
      }
    });
  },

  newStudent: function(e) {
    e.preventDefault();

    var firstName = $.trim($("#student-first-name", $(this.el)).val());
    var lastName = $.trim($("#student-last-name", $(this.el)).val());
    var school = $.trim($("#student-school", $(this.el)).val());
    
    var studentArray = ["Sung,Hyungie,384237", "Ma,Jason,23424", "Leon,Kim,234234"];
    var schoolArray = ["MIT,23235", "UCLA,2535", "UCSB,7657554"];
    var studentMap = {};
    var schoolMap = {};
    for (var i = 0; i < studentArray.length; i++) {
      var lowerLine = studentArray[i].toLowerCase();
      var studentTemp = lowerLine.split(",");
      studentMap[studentTemp[1]+"_"+studentTemp[0]] = studentTemp[2];
    }
    for (var i = 0; i < schoolArray.length; i++) {
      var lowerLine = schoolArray[i].toLowerCase();
      var schoolTemp = lowerLine.split(",");
      schoolMap[schoolTemp[0]] = schoolTemp[1];
    }
    var studentKey = firstName.toLowerCase()+"_"+lastName.toLowerCase();
    var schoolKey = school.toLowerCase();

    // Get participantID from students dictionary
    var participantID = studentMap[studentKey];
    // var participantID = this.studentMap[studentKey];
    if (participantID === undefined) {
      participantID = "";
    }

    // Get schoolID and schoolCode from school dictionary
    var schoolID = "2";
    // var schoolID = this.studentIDMap[studentKey];
    var schoolCode = schoolMap[schoolKey];
    // var schoolCode = this.schoolMap[schoolKey];
    if (schoolCode === undefined) {
      schoolCode = "";
    }

    var courseNames = this.trimStringsToArray($("#student-courses", $(this.el)).val());
    var grades = this.trimStringsToArray($("#student-grades", $(this.el)).val());
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

    var schoolYear = this.schoolYear;
    var period = this.period;
    var studentSize = this.studentSize;
    var studentMap = this.studentMap;
    var schoolMap = this.schoolMap;

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
    } else if (courseNames.length != grades.length) {
      $("#new-student-errors", $(this.el)).text("Please enter the same number of classes as grades.");
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
          grades: grades,
          classCategories: classCategories,
        }),
        success: function(data) {
            $.ajax({
              url:"/students",
              type:"GET"
            }).done(function(allStudents) {
              $('#newStudentModal').modal('hide');
              $('body').removeClass('modal-open');
              $('.modal-backdrop').remove();
              $('#content').html(new StudentsView({schoolYear: schoolYear, period: period, studentSize: allStudents.length,
                 studentMap: studentMap, schoolMap: schoolMap}).el);
            });
        },
        error: function (xhr, status, err) {
          $("#new-student-errors", $(self.el)).text(err);
        }
      });
    }

  },

  downloadTerm: function(e) {
    e.preventDefault();

    var schoolYear = this.schoolYear;
    var period = this.period;
    $.ajax({
      url:"/students",
      type:"GET"
    }).done(function(allStudents) {
      var fields = ["School Year","Period","First Name","Last Name","Participant ID","School ID","School","School Code","Course Name","Level","Grade","Class Category"];
      var fieldNames = ["firstName","lastName","participantID","schoolID","school","schoolCode"];
      var result = [];
      var header = fields.join(',');
      result.push(header);
      
      for (var i = 0; i < allStudents.length; i += 1) {
        var student = allStudents[i];
        var courses = student.courseNames;
        var grades = student.grades;
        var levels = student.levels;
        var categories = student.classCategories;
        for (var j = 0; j < courses.length; j += 1) {
          var course = courses[j];
          var level = levels[j];
          var grade = grades[j];
          var category = categories[j];
          result.push([schoolYear, period, student.firstName, student.lastName, student.participantID, student.schoolID, student.school, student.schoolCode, course, level, grade, category].join(','));
        }
      }
      var finalString = result.join('\n');

      // Data URI
      var csvData = 'data:text/csv;charset=UTF-8,' + encodeURIComponent(finalString);

      window.location.href = csvData;
    });
  },


  /* Helper functions */

  findLevel: function(courseName) {
    if (courseName.indexOf('AP') > -1) {
      return "AP";
    } else if (courseName.indexOf('Honors') > -1) {
      return "Honors";
    } else {
      return "Regular";
    }
  },

  categorizeClass: function(courseName) {
    var ARTS = ["studio", "visual"];
    var ENGLISH = ["english", "language"];
    var FOREIGN_LANG = ["spanish", "french", "latin"];
    var HISTORY = ["history", "government"];
    var MATH = ["math", "mathematics", "algebra", "trigonometry", "calculus"];
    var SCIENCE = ["science", "biology", "chemistry", "physics", "anatomy",];

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

  trimStringsToArray: function(str) {
    var strings = [];

    $.each(str.split(","), function(){
        strings.push($.trim(this));
    });

    return strings;
  },
});