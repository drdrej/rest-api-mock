var _ = require( "underscore" );

/**
 * ... byPattern.
 *
 * @param endpoint
 * @constructor
 */
var Endpoint = function(endpoint) {
    this.method  = endpoint.method;
    this.pattern = endpoint.pattern;

    this.cases = [];
};

Endpoint.prototype.addForwardCase = function(config, url) {
    this.cases.push( {
        bindType: 'Forward',
        path: config.endpoint.path, // Path-Patterns und andere Matcher.
        forwardUrl : url
    });
};

Endpoint.prototype.addErrCase = function( config, code, message ) {
    this.cases.push( {
        bindType: 'Error',
        path: config.endpoint.path, // Path-Patterns und andere Matcher.
        code: code,
        message: message
    });
};

Endpoint.prototype.addCase = function( config, callback, mappings ) {
    var ParamMapper = require( "./ParamMapper" );

    var mapper = new ParamMapper(mappings);

    var usecase = {
        bindType: 'Response',

        path: config.endpoint.path, // Path-Patterns und andere Matcher.

        callback : callback,
        mapper : mapper
    };

    this.cases.push( usecase );
};

Endpoint.prototype.useBy = function( server ) {
    var response = require( "./Response" );
    response(server, this.method, this.pattern, this.cases );
};



module.exports = Endpoint;