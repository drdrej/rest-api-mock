/**
 * Created by asiebert on 23.05.16.
 */
var unirest = require( "unirest" );

module.exports = function handle( usecase, inReq, inRes, inNext ) {
    var method = inReq.method.toLowerCase();
    var fwdReq = unirest[method]( usecase.forwardUrl );

    if (inReq.query) {
        console.log(">> copy query-params ... ");
        fwdReq.query(inReq.query);
    }

    /*
     if( inReq.params ) {
     console.log( ">> copy form-params ... ");
     fwdReq.form( inReq.params );
     }

     fwdReq.headers({
     'Content-Type': 'text/html'
     });
     */

    fwdReq.end(
        function success(response) {
            console.log(response);

            inRes.send(response.body); // BODY copy without modifications.

            inNext();
        },

        function error(err) {
            console.error(err);

            inRes.send({
                error: "Connection to endpoint [" + endpoint + "] is broken."
            });

            inNext();
        });

}