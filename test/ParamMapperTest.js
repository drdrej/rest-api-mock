var expect    = require("chai").expect;
var ParamMapper = require( "../impl/ParamMapper" );

describe("Parameter Mapper", function() {
    describe("instationation", function() {
        it( "all valid mappings", function() {
            var mapper = new ParamMapper([
                "query://test",
                "body://test2",
                "path://test3",
            ]);

            expect( mapper.mappings ).to.exist;
            expect( mapper.mappings.length ).to.exist;
            expect( mapper.mappings).to.not.be.empty;

            expect( mapper.mappings[0].type ).to.equal( "query" );
            expect( mapper.mappings[0].key ).to.equal( "test" );

            expect( mapper.mappings[1].type ).to.equal( "body" );
            expect( mapper.mappings[1].key ).to.equal( "test2" );

            expect( mapper.mappings[2].type ).to.equal( "path" );
            expect( mapper.mappings[2].key ).to.equal( "test3" );
        });
    });
});