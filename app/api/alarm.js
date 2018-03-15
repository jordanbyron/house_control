import ServerURL from '../config/server_url';

var AlarmAPI = function() {
  let passcode;

  var _sendKey = function(key) {
    return fetch(ServerURL + '/write' + '?key=' + String(passcode) + key, {
      method: 'POST'
    });
  };

  return {
    setPasscode: function(newPasscode) {
      passcode = newPasscode;
    },
    off: function() {
      _sendKey("1");
    },
    away: function() {
      _sendKey("2");
    },
    stay: function() {
      _sendKey("3");
    },
    panic: function() {
      fetch(ServerURL + '/panic', { method: 'post' });
    },
    status: function() {
      return fetch(ServerURL + '/status.json?timestamp=' + (new Date).toJSON());
    }
  }
}();

module.exports = AlarmAPI;
