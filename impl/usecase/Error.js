/**
 * Created by asiebert on 23.05.16.
 */
var _ = require( "underscore" );

module.exports = function handle( usecase, inReq, inRes, inNext ) {
    var msg = 'error-msg';
    
    if( usecase.message ) {
        msg = usecase.message;
    }

    inRes.status( usecase.code );

    if( _.isString(usecase.message) ) {
        inRes.send({
            msg: msg
        });
    } else {
        inRes.send(msg);
    }

    return inNext();
};