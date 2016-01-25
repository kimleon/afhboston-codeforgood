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

  newStudent: function() {

  },

  updateStudent: function() {

  },

});