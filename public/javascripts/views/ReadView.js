window.ReadView = Backbone.View.extend({

  initialize: function () {
    this.render();
  },

  render: function () {
    $(this.el).html(this.template());
    return this;
  },

  events:  {
    // "click .end-button":"endParty",
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