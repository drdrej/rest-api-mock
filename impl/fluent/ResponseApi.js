var ResponseApi = function( server, config ) {

    this.error = function() {

    };

    this.response = function( arguments, callback ) {
       server.endpoints.response( config, callback, arguments);
    };

    this.forward = function( forwardUrl ) {
        server.endpoints.forward( config, forwardUrl );
    };

};

module.exports = ResponseApi;

