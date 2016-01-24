window.StudentsView = Backbone.View.extend({
  initialize: function(options) {
    // this.student = options.student;
    this.render();
  },

  render: function() {
    $(this.el).html(this.template());
    return this;
  },

  events: {
    "click #new-student-button": "newStudent",
    "click #update-student-button": "updateStudent",
  },

  /* Button click functions */

  newStudent: function() {

  },

  updateStudent: function() {

  },

});