var ResponseApi = function( server, config ) {

    this.error = function() {

    };

    this.response = function( arguments, callback ) {
       server.endpoints.create( 'Response', config, callback, arguments);
    };

    this.forward = function(arguments, callback) {
        server.endpoints.create( 'Forward', config, callback, arguments);
    };

};

module.exports = ResponseApi;

