var AppRouter = Backbone.Router.extend({

  routes: {
    "": "home",
    "terms": "uploadTerm",
    "students": "getTranscript",
    // "read": "read",
    // "check": "check",
    // "download": "download",
    "*notFound": "notFound",
  },

  initialize: function() {
    console.log("here");
    $('#content').html(new StudentsView().el);
  },

  uploadTerm: function() {
    $('#content').html(new TermsView().el);
  },

  getTranscript: function() {
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