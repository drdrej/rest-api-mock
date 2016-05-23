var _ = require( "underscore" );
var Endpoint = require( "./Endpoint" );

var Endpoints = function() {

    this.endpoints = {};

    /**
     * Create/Bind endpoints and usecases.
     */
    this.create = function(bindingType, reqConfig, callback, arguments) {

        /*
         if( _.isObject( reqConfig )
         && _.has(reqConfig, "endpoint")
         && _.has(reqConfig.endpoint, "pattern") ) {

         console.error( "!! resultConfig.endpoint.pattern not exists." );
         return;
         }
         */


        var endpoint = this.endpoints[ reqConfig.endpoint.pattern ];

        if( !endpoint ) {
            endpoint = new Endpoint( reqConfig.endpoint );
            this.endpoints[ reqConfig.endpoint.pattern ] = endpoint;
        }

        endpoint.addCase( bindingType, reqConfig, callback, arguments);

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