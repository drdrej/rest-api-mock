var assert = require("chai").assert;
var Server = require("../server.js" );

describe("Server HTTP Api", function() {

    var server = new Server({
        name: "test"
    });

    server.on({
        name: "endpoint-get-1",
        description: "this endpoint returns a { success : true }.",

        endpoint : {
            method: "get",
            pattern: "/get/:id",
            path: "/get/1"
        },

        log: true
    }).response([],
        function ( ) {
            return { success: true };
        });

    var restify = require( "restify" );
    var client = restify.createJsonClient({
        url: 'http://localhost:8383',
        version: '*'
    });




    before(function () {
        console.log( "start server..." );
        server.start();
    });

    after(function () {
        console.log( "stop server..." );
        server.stop();
    });



    // ------------------ test-cases ---------------------
    describe("get-endpoint exists", function() {

        it( "get", function( done ) {

            client.get('/get/1', function(err, req, res, obj) {
                assert.ifError( err);
                assert.equal( 200, res.statusCode );

                assert.isDefined(obj, 'has response object');
                assert.isDefined(obj.success, "response object has property 'success'." );

                done();
            });

        });

    });


/*
    describe("get-endpoint not exists", function() {

    });
*/

});

