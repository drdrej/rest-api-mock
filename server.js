//strict

var restify = require('restify');
var jsonpointer = require( 'jsonpointer.js' );
// var querystring = require('querystring');

var ResponseHandler = function(server, requestConfig) {
    this.server = server;
    this.requestConfig = requestConfig;
};

ResponseHandler.prototype.match = function () {

};

ResponseHandler.prototype.response = function( resultFnc ) {
    if( !this.requestConfig.method ) {
        throw "MISSING param in server.config";
    }

    function log( req ) {
       console.log( "> body: ");
       console.log( req.body );
       console.log( "< body" );
    }


    this.server[this.requestConfig.method] (
        this.requestConfig.endpoint,
        function ( inReq, inRes, inNext ) {

            log(inReq);

            var body =  function body( path ) {
                if( !inReq.body ) {
                    console.error( "Body is NULL/undefined, couldn't request body." );
                    return undefined;
                }

                return jsonpointer.get( inReq.body, path );
            };

            // match()
            var json = resultFnc(body);

            if( json == null ) {
                json = {};
            }

            inRes.send(json);

            return inNext();

            // else -?> skip ---> am ende muss ein default response zurueck gegeben.
        });
};

var Server = function( config ) {
    this.appState = {};

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

    /*
    server.on( 'after', restify.auditLogger({
        log: bunyan.createLogger({
            name: 'audit',
            stream: process.stdout
        })
    }));
    */

    console.log("> server initialization completed." );
    this.server = server;
};

Server.prototype.on = function( requestConfig ) {
    return new ResponseHandler(this.server, requestConfig );
};

Server.prototype.state = function( initial ) {
    this.appState = initial;
};

Server.prototype.get = function( path ) {
    return jsonpointer.get(this.appState, path );
};

/*
Server.prototype.push = function( path, value ) {

};
*/

Server.prototype.start = function ( ) {
    this.server.listen( 8383, function () {
        console.log("rest-api successful started. let's play" );
//        console.log('%s listening at %s', this.server.name, this.server.url);
    });
};

module.exports = Server;

