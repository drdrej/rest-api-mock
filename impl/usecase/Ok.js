/**
 * Created by asiebert on 23.05.16.
 */
var _ = require( "underscore" );

module.exports = function handle( usecase, inReq, inRes, inNext ) {
    var msg;

    if( usecase.action ) {
        msg = usecase.action;
    } else {
        console.log( "!! no json for Ok-action passed. Use {} as default." );
        msg = {};
    }

    inRes.status( 200 );
    inRes.send(msg);

    return inNext();
};