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

    if( !usecase.callback ) {
        console.error("!! usecase.callback is missing, retur {}." );
        inRes.send({});

        return inNext();
    }

    var args = [];
    if( usecase.mapper ) {
        args = usecase.mapper.map(inReq);
    }

    var json = usecase.callback.apply(usecase, args);

    if ( !json ) {
        json = {};
    }

    inRes.send(json);

    return inNext();
};
