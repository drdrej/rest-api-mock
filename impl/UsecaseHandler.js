module.exports = function(pattern, matchCase, inReq, inRes, inNext) {
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

    var handle = require( "./usecase/" + usecase.bindType );

    // TODO: if no handler found????

    handle(usecase, inReq, inRes, inNext );
};
