var AppRouter = Backbone.Router.extend({

  routes: {
    "": "home",
    "test": "test",
    "terms": "terms",
    "students": "students",
    "*notFound": "notFound",
  },

  home: function() {
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
              // $("#restart-errors", $(this.el)).text("Something went wrong on our end.");
              // $("#restart-errors", $(self.el)).text(err);
          }
        })
      }, error: function(xhr, status, err) {
          // $("#restart-errors", $(this.el)).text("Something went wrong on our end.");
          // $("#restart-errors", $(self.el)).text(err);
      }
    });
  },

  test: function() {
    $(document.body).append("Test route has been called..");
  },

  terms: function() {
    $('#content').html(new TermsView().el);
  },

  students: function() {
    $('#content').html(new StudentsView().el);
  },

  notFound: function() {
    $('#content').html("<h1>Page not found</h1>");
  }
});

utils.loadTemplate(["StudentsView", "TermsView"], function() {
  app = new AppRouter();
  Backbone.history.start();
});