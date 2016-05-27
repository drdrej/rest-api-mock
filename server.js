'strict'

var _ = require( "underscore" );
var restify = require('restify');

// var jsonpointer = require( 'jsonpointer.js' );
// var unirest = require( "unirest" );

var Endpoints = require( "./impl/Endpoints" );
var ResponseApi = require( "./impl/fluent/ResponseApi" );

var ParamMapper = require( "./impl/ParamMapper" );


var Server = function( config ) {
    this.appState = {};
    this.config = config;

    this.endpoints = new Endpoints();

    var server = restify.createServer({
        name: config.name + '-rest-api',
        version: '1.0.0'
    });

    server.use(restify.acceptParser(server.acceptable));
    server.use(restify.queryParser());
    server.use(restify.bodyParser());

    server.use(restify.CORS(
        {
            origins: [ '*' ],
            credentials: true,
            headers: ['x-foobar']
        }));

    server.use(restify.fullResponse());

    console.log("> http-server initialization completed." );

    this.server = server;
};

Server.prototype.on = function( requestConfig ) {
    return new ResponseApi(this, requestConfig);
};

/*
Server.prototype.usecase = function( requestConfig ) {
    return new ResponseApi(this, requestConfig);
};
*/


Server.prototype.state = function( initial ) {
    this.appState = initial;
};

Server.prototype.get = function( path ) {
    return jsonpointer.get(this.appState, path );
};


Server.prototype.start = function ( ) {
    if (!this.isUnregistred) {
        console.log("# Setup endpoints." );

        this.endpoints.register(this.server);
        this.isUnregistred = true;
    }

    // start server ...
    var port = (this.config.port ? this.config.port : 8383);
    this.server.listen( port, function () {
        console.log(".. rest-api successful started," );
        console.log(".. listen at port: " + port );
        console.log(".. let's play!" );
    });
};

Server.prototype.stop = function ( ) {
    // ??? this.endpoints.register( this.server );

    this.server.close( function () {
        console.log("rest-api successful stopped. good night!" );
    });
};

module.exports = Server;
