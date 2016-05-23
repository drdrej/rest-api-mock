var expect    = require("chai").expect;
var Server = require("../server.js" );

describe("Server lifecycle", function() {

    describe("initialization", function() {

        it( "simple server", function() {
            var server = new Server({
                name: "test"
            });

            expect( server.appState ).to.exist;
            expect( server.endpoints ).to.exist;
            expect( server.server ).to.exist;

            //expect( server ).to.be.a('server');
            // expect( server.endpoints ).to.be.a( 'endpoints' );
        });

    });


});

