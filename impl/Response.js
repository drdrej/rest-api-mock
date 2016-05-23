var _ = require( "underscore" );
var Response = function( server, method, pattern, cases ) {

    console.log( "setup endpoint "
        + method + ": "
        + pattern);

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

    var logMsgCatchReq = ("catched " + method + " rest-call of " + pattern);

    server[method] (pattern,
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

            if( !usecase.callback ) {
                console.error("!! usecase.callback is missing, retur {}." );
                inRes.send({});

                return inNext();
            }

            var args= [];
            if( usecase.mapper ) {
                args = usecase.mapper.map(inReq);
            }

            var json = usecase.callback.apply(usecase, args);

            if ( !json ) {
                json = {};
            }

            inRes.send(json);

            return inNext();
        });
};


module.exports = Response;
