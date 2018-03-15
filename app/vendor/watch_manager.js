var {
  DeviceEventEmitter, NativeModules
} = require('react-native');

var WatchManager = NativeModules.WatchManager;

module.exports = {

  activate: function() {
    WatchManager.activate();
  },

  addMessageListener: function(callback, context) {
    return DeviceEventEmitter.addListener('onWatchMessage', function (message) {
      callback.call(context, message);
    });
  },

  removeMessageListener: function(subscription) {
    subscription.remove();
  },

  sendMessage: function(msg) {
    WatchManager.sendMessage(msg);
  }
};
