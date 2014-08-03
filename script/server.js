var _            = require("underscore"),
    Promise      = require("bluebird"),
    thicket      = require("thicket"),
    Logger       = thicket.c("logger"),
    CLA          = thicket.c("appenders/console-log"),
    App          = thicket.c("app"),
    Bootstrapper = thicket.c("bootstrapper");


var Log = Logger.create("MySampleApp");

var MySampleApp = function() {
  this.initialize.apply(this, arguments);
};

_.extend(MySampleApp.prototype, App.prototype, {
  initialize: function() {
    App.prototype.initialize.apply(this, arguments);
  },
  up: Promise.method(function() {
    Log.debug("Look at me, doing some meaningful setup work...");
  }),
  down: Promise.method(function() {
    Log.debug("Look at me, doing some meaningful teardown work...");
  })
});

Logger.root().setLogLevel(Logger.Level.Debug);
Logger.root().addAppender(new CLA());

var bootstrapper = new Bootstrapper({applicationConstructor: MySampleApp});
bootstrapper
  .bootstrap()
  .then(function(appContainer) {
    return appContainer.start();
  });
