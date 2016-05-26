/**
 * Created by asiebert on 23.05.16.
 */
module.exports = function handle( usecase, inReq, inRes, inNext ) {
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