window.TermsView = Backbone.View.extend({
  initialize: function(options) {
    this.render();
  },

  render: function() {
    $(this.el).html(this.template());
    return this;
  },

  events: {
    "click #new-term-button": "newTerm",
    "click #delete-term-button": "deleteTerm",
  },

  /* Button click functions */
  
  newTerm: function(e) {
    e.preventDefault();
      var schoolYear = $("#school-year", $(this.el)).val();
      var period = $("#period", $(this.el)).val();

      // var studentIDs = $("#student-ids", $(this.el)).val().split('.com/')[1];
      var studentIDs = "BDTr71MTPOV27JFdH53M";
      // var schoolIDs = $("#school-ids", $(this.el)).val().split('.com/')[1];
      var schoolIDs = "1kWBe97fTUGY4JQaVv8c";
      var studentMap = {};
      var schoolMap = {};

      var studentBlob = {
        url: 'https://www.filepicker.io/api/file/'+studentIDs,
        filename: 'studentIDs.csv',
        mimetype: 'text/csv',
        isWriteable: true,
        size: 100
      };
      var schoolBlob = {
        url: 'https://www.filepicker.io/api/file/'+schoolIDs,
        filename: 'schoolIDs.csv',
        mimetype: 'text/csv',
        isWriteable: true,
        size: 100
      };
      if (studentIDs === undefined) {
        $("#upload-term-errors", $(this.el)).text("Please upload the student to salesforce id csv.");
      } else {
        filepicker.read(
          studentBlob,
          function(data){
            var lines = data.split("\n");
            for (var i = 1; i < lines.length; i++) {
              var lowerLine = lines[i].toLowerCase();
              var student = lowerLine.split(",");
              studentMap[student[1]+"_"+student[2]] = student[3];
            }
          }
        );
      }
      if (schoolIDs === undefined) {
        $("#upload-term-errors", $(this.el)).text("Please upload the school to salesforce id csv.");
      } else {
        filepicker.read(
          schoolBlob,
          function(data){
            var lines = data.split("\n");
            for (var i = 1; i < lines.length; i++) {
              var lowerLine = lines[i].toLowerCase();
              var school = lowerLine.split(",");
              schoolMap[school[0]] = school[1];
            }
          }
        );
      }
      
      var self = this;
      if (schoolYear === "") {
        $("#upload-term-errors", $(this.el)).text("Please enter the school year.");
      } else if (period === "") {
        $("#upload-term-errors", $(this.el)).text("Please enter the period.");
      } else if (studentIDs === undefined) {
        $("#upload-term-errors", $(this.el)).text("Please upload the student to salesforce id csv.");
      } else if (schoolIDs === undefined) {
        $("#upload-term-errors", $(this.el)).text("Please upload the school to salesforce id csv.");
      } else {
        $.ajax({
          url: "/terms",
          type: "POST",
          contentType: 'application/json; charset=utf-8',
          data: JSON.stringify({schoolYear: schoolYear, period: period, students: [], studentMap: studentMap, schoolMap: schoolMap}),
          success: function(data) {
            console.log(schoolMap)
            console.log(studentMap)
            // $('#content').html(new StudentsView({schoolYear: schoolYear, period: period, studentSize: 0,
            //   studentMap: studentMap, schoolMap: schoolMap}).el);
          },
          error: function(xhr, status, err) {
            $("#upload-term-errors", $(self.el)).text(err);
          }
        });
      }
  },

});