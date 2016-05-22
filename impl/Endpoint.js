var _ = require( "underscore" );
var ParamMapper = require( "./ParamMapper" );

/**
 * ... byPatter.
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

Endpoint.prototype.matchCase = function( inReq ) {
    var rval;

    _.each( this.cases,
        function( usecase ) {

            if( inReq.path() === usecase.path ) {
                rval = usecase;
            }
    });

    return rval;
};


Endpoint.prototype.useBy = function( server ) {
    console.log( "setup endpoint "
        + this.method + ": "
        + this.pattern);


    ...

    server[this.method] (this.pattern, function( inReq, inRes, inNext ) {
        console.log("catched " + this.method + " rest-call of " + this.pattern);

        // if(hasLog)
        //    log(inReq);

        var usecase = this.matchCase(inReq);

        if (!usecase) {
            console.error("usecase not found.");
            return inNext();
        }

        var args = usecase.mapper.map(inReq);
        var json = usecase.mapper.callback.apply(this, args);


        if (json == null) {
            json = {
                success: true
            };
        }

        inRes.send(json);

        return inNext();
    });
};



module.exports = Endpoint;