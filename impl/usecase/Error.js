/**
 * Created by asiebert on 23.05.16.
 */
var _ = require( "underscore" );

module.exports = function handle( usecase, inReq, inRes, inNext ) {
    var msg = 'error-msg';
    
    if( usecase.message ) {
        msg = usecase.message;
    }

    if( usecase.code && usecase.code > 399 )
        inRes.status( usecase.code );
    else
        inRes.status( 500 ); // default error code

    if( _.isString(usecase.message) ) {
        inRes.send({
            msg: msg
        });
    } else {
        inRes.send(msg);
    }

    return inNext();
};