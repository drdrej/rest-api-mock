module.exports = function(config) {
    var Server = require("../server.js" );
    var server = new Server(config);
    server.start();
};
