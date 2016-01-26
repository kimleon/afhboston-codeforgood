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
    var firstName = $.trim($("#student-first-name", $(this.el)).val());
    var lastName = $.trim($("#student-last-name", $(this.el)).val());
    var school = $.trim($("#student-school", $(this.el)).val());
    var studentArray = ["Sung,Hyungie,384237", "Ma,Jason,23424", "Leon,Kim,234234", "Shader,Sarah,772837", "Luo,Lauren,78238", "Pybus,Alyssa,892353", "Anand,Advaith,32423", "Lai,Alicia,534534", "Shea,Andrew,34142", "Deb,Chaarushena,635647", "Stroming,Jeremy,435345", "Luo,Jingya,3452123", "Leonardo,Kevin,67534", "Rosero,Marco,2345367", "Hagan,Matthew,4563452", "Thai,Megan,465784", "Kelsall,Nora,3524576", "Gonzalez,Omar,354425", "Zhong,Tim,45357432", "Katcoff,Abigail,4657841", "Espinosa,Camilo,4657842", "Helman,Efraim,4657843", "Shuter,Elisheva,4657844", "Perez,Emanuel,4657845", "Hernandez,Erick,4657846", "Kim,Hyun Jong,4657847", "Starobinski,Keren,4657848", "Slaten,Leah,4657849", "Guillen,Manuel,46578410", "Glasgow,Margalit,46578411", "Jay,Maya,46578412", "Marie,Nahom,46578413", "Propp,Oron,46578414", "Bruno,Prela,76578412", "Chandler,Squires,86578413", "German,Soto,96578414", "Haley,Strouf,42578415", "Maxwell,Lancaster,42578416"];
    var schoolArray = ["MIT,23235", "UCLA,2535", "UCSB,7657554", "Harvard,65352454", "CalTech,54565345", "School Name,6345756", "NYU,7867", "U Penn,45", "Boston College,67456345234365", "Berkeley,56436576", "Other Berkeley,5347", "UCSD,56465534", "Columbia,54365435676", "Princeton,45655", "Yale,44665"];
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
    if (participantID === undefined) {
      participantID = "";
    }
    console.log(participantID);

    // Get schoolID and schoolCode from school dictionary
    var schoolID = "2";
    var schoolCode = schoolMap[schoolKey];
    if (schoolCode === undefined) {
      schoolCode = "";
    }
    console.log(schoolCode);

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

          Backbone.history.navigate("/students");
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