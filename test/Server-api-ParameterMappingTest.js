var assert = require("chai").assert;
var Server = require("../server.js" );

describe("Do POST-Requests with different params to check param-handling.", function() {

    var server = new Server({
        name: "test"
    });

    server.on({
        name: "mock://get-1",
        description: "inject path param",

        endpoint : {
            method: "get",
            pattern: "/get/:id",
            path: "/get/1"
        },

        log: true
    }).response([
        "path://id",
        "query://name"
    ],
        function ( p, q ) {
            return {
                success: true,
                name: "mock://get-1",

                p : "path=" + p,
                q : "query=" + q
            };
        });


    // ================================= init cliend ================================================

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
    describe("get with path param=1", function() {

        it( "get", function( done ) {
            client.get('/get/1', function(err, req, res, obj) {
                assert.ifError( err);
                assert.equal( 200, res.statusCode );

                assert.isDefined(obj, 'has response object');
                assert.isDefined(obj.success, "response object has property 'success'." );

                assert.isDefined(obj.q, "response object has property 'q'." );
                assert.equal("query=undefined", obj.q);


                assert.isDefined(obj.p, "response object has property 'p'." );
                assert.equal("path=1", obj.p);

                done();
            });
        });

    });

    describe("get with path param=1, query=xyz", function() {

        it( "get", function( done ) {
            client.get('/get/1?name=xyz',
                function(err, req, res, obj) {

                    assert.ifError( err);
                    assert.equal( 200, res.statusCode );

                    assert.isDefined(obj, 'has response object');
                    assert.isDefined(obj.success, "response object has property 'success'." );

                    assert.isDefined(obj.q, "response object has property 'q'." );
                    assert.equal("query=xyz", obj.q);

                    assert.isDefined(obj.p, "response object has property 'p'." );
                    assert.equal("path=1", obj.p);

                    done();
            });
        });

    });


});

