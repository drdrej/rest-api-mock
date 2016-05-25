var _ = require( "underscore" );

var ResponseApi = function( server, config ) {

    this.error = function( code, msg ) {
        server.endpoints.error( config, code, msg );
    };

    this.ok = function( json ) {
        server.endpoints.ok(config, arguments);
    };

    this.response = function( arguments, callback ) {
        if( _.isFunction(arguments) ) {
            server.endpoints.response(config, arguments, undefined);
        } else if( _.isArray(arguments)
                   && _.isFunction(callback)) {
            server.endpoints.response(config, callback, arguments);
        } else if( _.isObject(arguments) ) {
            server.endpoints.ok(config, arguments);
        } else {
            // server.endpoints.response(config, callback, arguments);
            throw new Error( "unsupported response?");
        }
    };

    this.forward = function( forwardUrl ) {
        server.endpoints.forward( config, forwardUrl );
    };

};

module.exports = ResponseApi;

