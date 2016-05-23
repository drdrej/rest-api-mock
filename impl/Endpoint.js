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


Endpoint.prototype.addCase = function( bindType, config, callback, mappings ) {
    var ParamMapper = require( "./ParamMapper" );

    var mapper = new ParamMapper(mappings);

    this.cases.push( {
        bindType: bindType,
        path: config.endpoint.path, // Path-Patterns und andere Matcher.

        callback : callback,
        mapper : mapper
    });
};

Endpoint.prototype.useBy = function( server ) {
    var response = require( "./Response" );
    response(server, this.method, this.pattern, this.cases );
};



module.exports = Endpoint;