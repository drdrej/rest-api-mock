//strict

var restify = require('restify');
var jsonpointer = require( 'jsonpointer.js' );
var unirest = require( "unirest" );
var ParamMapper = require( "./impl/ParamMapper" );

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
    // Case-Sensoitive-Check.
    _checkMethod(this.requestConfig);

    var endpoint = this.requestConfig.endpoint;
    var method = this.requestConfig.method;

    this.server[method] (
        endpoint,
        function ( inReq, inRes, inNext ) {
            // log(inReq);

            var fwdReq = unirest[method]( fwdUrl );

            if( inReq.query ) {
                console.log( ">> copy query-params ... " );
                fwdReq.query( inReq.query );
            }

            /*
            if( inReq.params ) {
                console.log( ">> copy form-params ... ");
                fwdReq.form( inReq.params );
            }

            fwdReq.headers({
                'Content-Type': 'text/html'
            });
            */

            fwdReq.end(
                function success(response) {
                    console.log( response );

                    inRes.send(response.body); // BODY copy without modifications.

                    inNext();
                },

                function error( err ) {
                    console.error( err );

                    inRes.send( {
                        error: "Connection to endpoint [" + endpoint +"] is broken."
                    });

                    inNext();
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
}


ResponseHandler.prototype.error = function( httpCode,  resultFnc ) {

};

ResponseHandler.prototype.responseV1 = function( resultFnc ) {
    _checkMethod(this.requestConfig);

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


function log( req ) {
    console.log( "> body: ");
    console.log( req.body );
    console.log( "< body" );
}

ResponseHandler.prototype.response = function( resultFnc ) {
    _checkMethod(this.requestConfig);

    var mappings = null;

    if( this.requestConfig.mappings )
        mappings = this.requestConfig.mappings;

    var hasLog = false;

    if( this.requestConfig.log )
        hasLog = this.requestConfig.log;

    this.server[this.requestConfig.method] (
        this.requestConfig.endpoint,
        function ( inReq, inRes, inNext ) {
            if(hasLog)
                log(inReq);

            var paramMapper = new ParamMapper(mappings);

            var json;

            if( !resultFnc ) {
                json = {};
            } else {
                var params = paramMapper.map(inReq);
                json = resultFnc.apply(resultFnc, params);
            }

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
