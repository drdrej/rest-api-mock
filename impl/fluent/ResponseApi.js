var ResponseApi = function( server, config ) {

    this.error = function() {

    };

    this.response = function( arguments, callback ) {
        server.endpoints.create(config, callback, arguments );
    };

    this.forward = function() {

    };

};

module.exports = ResponseApi;

