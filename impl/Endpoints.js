var _ = require( "underscore" );
var Endpoint = require( "./Endpoint" );

var Endpoints = function() {

    this.endpoints = {};


    this.create = function( reqConfig ) {
        var endpoint = this.endpoints[ reqConfig.endpoint.pattern ];

        if( !endpoint ) {
            endpoint = new Endpoint( reqConfig.endpoint );
            this.endpoints[ reqConfig.endpoint.pattern ] = endpoint;
        }

        return endpoint;
    };

    /**
     * Create/Bind endpoints and usecases.
     */
    this.response = function(reqConfig, callback, arguments) {
        var endpoint = this.create( reqConfig );
        endpoint.addCase(reqConfig, callback, arguments);

        return endpoint;
    };


    this.forward = function(reqConfig, url) {
        var endpoint = this.create( reqConfig );
        endpoint.addForwardCase(reqConfig, url);

        return endpoint;
    };


    /*
    this.response = function( reqConfig, callback, arguments  ) {
        this.bind( reqConfig, callback, arguments );
    };
    */


    /**
     * register all endpoints ...
     *
     * @param server
     */
    this.register = function( server ) {
        _.each(this.endpoints, function(endpoint) {
            endpoint.useBy(server);
        });
    }

};

module.exports = Endpoints;