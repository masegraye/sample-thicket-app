var _       = require("underscore"),
    Promise = require("bluebird"),
    thicket   = require("thicket"),
    Logger  = thicket.c("logger"),
    CLA     = thicket.c("appenders/console-log"),
    App     = thicket.c("app");

var MySampleApp = function() {
  this.initialize.apply(this, arguments);
};

_.extend(MySampleApp.prototype, App.prototype, {
  initialize: function() {
    App.prototype.initialize.apply(this, arguments);
  },
  up: Promise.method(function() {}),
  down: Promise.method(function() {})
});

Log = Logger.create("Main");
Logger.root().setLogLevel(Logger.Level.Debug);
Logger.root().addAppender(new CLA());

var app = new MySampleApp({configuration: {}});
app.start();

process.on("SIGINT", function() {
  Promise
    .attempt(function() {
      Log.debug("Received SIGINT");
      return app.stop();
    })
    .caught(function(err) {
      Log.error("Caught error shutting down", err);
    })
    .lastly(function() {
      process.exit(0);
    });
});
