import ServerURL from '../config/server_url';

var GarageDoorAPI = function() {
  return {
    toggle: function() {
      fetch(ServerURL + '/toggle', {
        method: 'post'
      });
    },

    status: function() {
      fetch(ServerURL + '/status')
    }
  }
}();

module.exports = GarageDoorAPI;
