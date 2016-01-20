var AppRouter = Backbone.Router.extend({

  routes: {
    "": "upload",
    // "read": "read",
    // "check": "check",
    // "download": "download",
    "*notFound": "notFound",
  },

  initialize: function () {
  },

  upload: function () {
    $('#content').html(new TermsView().el);
  },

  // read: function () {
  //   $('#content').html(new ReadView().el);
  // },

  // check: function () {
  //   $('#content').html(new CheckView().el);
  // },

  // download: function () {
  //   $('#content').html(new DownloadView().el);
  // },

  notFound: function () {
    $('#content').html("<h1>Page not found</h1>");
  }
});

utils.loadTemplate(["StudentsView", "TermsView"], function() {
  app = new AppRouter();
  Backbone.history.start();
});