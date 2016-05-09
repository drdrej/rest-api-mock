//strict

var restify = require('restify');
var jsonpointer = require( 'jsonpointer.js' );
var unirest = require( "unirest" );

// var querystring = require('querystring');

var ResponseHandler = function(server, requestConfig) {
    this.server = server;
    this.requestConfig = requestConfig;
};

ResponseHandler.prototype.match = function () {
    // todo: match params.
    return true;
};

ResponseHandler.prototype.forward = function( fwdUrl, fwdResultHandlerFnc ) {
    _checkMethod(this.requestConfig);

    this.server[this.requestConfig.method] (
        this.requestConfig.endpoint,
        function ( inReq, inRes, inNext ) {
            // log(inReq);

            var fwdReq = unirest.get( fwdUrl );

            fwdReq.method( this.requestConfig.method );

            if( inReq.query ) {
                console.log( ">> copy query-params ... ");
                fwdReq.query( inReq.query );
            }

            if( inReq.params ) {
                console.log( ">> copy form-params ... ");
                fwdReq.form( inReq.params );
            }

            fwdReq.headers({
                'Content-Type': 'text/html'
            });

            fwdReq.end(
                function success(response) {
                    console.log(response);

                    inRes.send(response.body); // BODY wird einfach weiter kopiert.

                    inNext();
                },

                function error( err) {
                    console.log("err: " + err);
                });
        }
    );

};

// config check methoden :::
// -----------------------------------------------------
function _checkMethod( config ) {
    if( !config.method ) {
        throw "MISSING param in server.config";
    }

    return true;
};

ResponseHandler.prototype.response = function( resultFnc ) {
    _checkMethod(this.requestConfig);

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


Server.prototype.start = function ( ) {
    this.server.listen( 8383, function () {
        console.log("rest-api successful started. let's play" );
    });
};

module.exports = Server;
