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

  // endParty: function(e) {
  //   var partyId = $(e.currentTarget).attr("id").substr(4);
  //   var courseId = $(e.currentTarget).parents(".class-tab-panel").eq(0).attr("id").substr(13);
  //   var self = this;
  //   $.ajax({
  //     type: "DELETE",
  //     url: "/parties/"+partyId,
  //     success: function() {
  //       socket.emit("remove party", partyId);
  //       $(e.currentTarget).parents(".course-line").eq(0).remove();
  //       self.map.removeLayer(self.markers[courseId][partyId]);
  //       delete self.markers[courseId][partyId];
  //       if (self.user.party == partyId) {
  //         self.user.party = undefined;
  //       }
  //     }, error: function( xhr, status, err) {
  //       self.newGeneralError(err);
  //     }
  //   })
  // },

});