var AppRouter = Backbone.Router.extend({

  routes: {
    "": "home",
    "test": "test",
    "terms": "terms",
    "students": "students",
    "*notFound": "notFound",
  },

  home: function() {
    $('#content').html(new TermsView().el);
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