var _ = require( "underscore" );
var ParamMapper = require( "./ParamMapper" );

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


Endpoint.prototype.addCase = function( endpoint, callback, mappings ) {
    var ParamMapper = require( "./ParamMapper" );

    var mapper = new ParamMapper(mappings);

    this.cases.push( {
        path: endpoint.path, // Path-Patterns und andere Matcher.

        callback : callback,
        arguments : mapper
    });
};

// Endpoint.prototype.matchCase =


Endpoint.prototype.useBy = function( server ) {
    console.log( "setup endpoint "
        + this.method + ": "
        + this.pattern);

    var cases = this.cases;

    function matchCase( inReq ) {
        var rval;

        _.each( cases,
            function( usecase ) {

                if( inReq.path() === usecase.path ) {
                    rval = usecase;
                }
            });

        return rval;
    };

    var logMsgCatchReq = ("catched " + this.method + " rest-call of " + this.pattern);
    var pattern = this.pattern;

    server[this.method] (this.pattern,
        function( inReq, inRes, inNext ) {
            console.log( logMsgCatchReq );

            // if(hasLog)
            //    log(inReq);

            var usecase = matchCase(inReq);

            if (!usecase) {
                console.error("usecase not found.");
                inRes.send( {
                    "error" : "no usecase attached to this pattern",
                    "pattern" : pattern,
                    "path" : inReq.path()
                });

                return inNext();
            }

            var args = usecase.mapper.map(inReq);
            var json = usecase.mapper.callback.apply(this, args);

            if ( !json ) {
                json = {
                    success: true
                };
            }

            inRes.send(json);

            return inNext();
    });
};



module.exports = Endpoint;