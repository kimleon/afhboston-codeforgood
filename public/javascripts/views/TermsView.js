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
      var self = this;
      if (schoolYear == "") {
        $("#upload-term-errors", $(this.el)).text("Please enter the school year.");
      } else if (period == "") {
        $("#upload-term-errors", $(this.el)).text("Please enter the period.");
      } else {
        $.ajax({
          url: "/terms",
          type: "POST",
          data: {schoolYear: schoolYear, period: period},
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