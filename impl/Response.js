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

            var handle = require( "./HandleUseCase");
            return handle(pattern, matchCase, inReq, inRes, inNext);
        });
};


module.exports = Response;
