window.TermsView = Backbone.View.extend({
  initialize: function(options) {
    // this.term = options.term;
    this.render();
  },

  render: function() {
    $(this.el).html(this.template());
    return this;
  },

  events: {
    "click #new-term-button": "newTerm",
    "click #download-term-button": "downloadTerm",
    "click #delete-term-button": "deleteTerm",
  },

  /* Button click functions */
  
  newTerm: function(e) {
    e.preventDefault();
      var schoolYear = $("#school-year", $(this.el)).val();
      var period = $("#period", $(this.el)).val();
      // var studentIDs = $("#student-ids", $(this.el)).val().split('.com/')[1];
      var studentIDs = "sODPy7MuR0SvmzxCALdg";
      // var schoolIDs = $("#school-ids", $(this.el)).val().split('.com/')[1];
      var schoolIDs = "odzAreu3RnOK68A2ds3Q";
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
      filepicker.read(
        studentBlob,
        function(data){
          var lines = data.split("\n");
          for (var i = 1; i < lines.length; i++) {
            var student = lines[i].split(",");
            studentMap[student[1]+"_"+student[0]] = student[2];
          }
          console.log(studentMap);
        }
      );
      filepicker.read(
        schoolBlob,
        function(data){
          var lines = data.split("\n");
          for (var i = 1; i < lines.length; i++) {
            var school = lines[i].split(",");
            schoolMap[school[0]] = school[1];
          }
          console.log(schoolMap);
        }
      );
      var self = this;
      if (schoolYear == "") {
        $("#upload-term-errors", $(this.el)).text("Please enter the school year.");
      } else if (period == "") {
        $("#upload-term-errors", $(this.el)).text("Please enter the period.");
      } else if (studentIDs == "") {
        $("#upload-term-errors", $(this.el)).text("Please upload the student to salesforce id csv.");
      } else if (schoolIDs == "") {
        $("#upload-term-errors", $(this.el)).text("Please upload the school to salesforce id csv.");
      } else {
        $.ajax({
          url: "/terms",
          type: "POST",
          contentType: 'application/json; charset=utf-8',
          data: JSON.stringify({schoolYear: schoolYear, period: period}),
          success: function () {
            // TODO: change navigating route
            Backbone.history.navigate("/");
            window.location.reload();
          },
          error: function (xhr, status, err) {
            $("#upload-term-errors", $(self.el)).text(err);
          }
        });
      }
  },

  downloadTerm: function() {

  },

  deleteTerm: function() {

  },


});