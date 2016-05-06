//strict

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

    this.server[this.requestConfig.method] (
        this.requestConfig.endpoint,
        function ( inReq, inRes, inNext ) {
            // match()
            var json = resultFnc();
            if( json == null ) {
                json = {};
            }

            inRes.send(json);

            return inNext();

            // else -?> skip ---> am ende muss ein default response zurueck gegeben.
        });
};

var Server = function( config ) {
    var restify = require('restify');
    // var querystring = require('querystring');

    // TODO: Init Logger ...

    var server = restify.createServer({
        name: config.name + '-rest-api',
        version: '1.0.0'
        /* log: log */
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

    // TODO: log server initialization completed.
    this.server = server;
};

Server.prototype.on = function( requestConfig ) {
    return new ResponseHandler(this.server, requestConfig );
};

Server.prototype.start = function ( ) {
    this.server.listen( 8383, function () {
        console.log("rest-api successful started. let's play" );
//        console.log('%s listening at %s', this.server.name, this.server.url);
    });
};

module.exports = Server;

