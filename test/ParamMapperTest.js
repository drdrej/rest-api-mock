var expect    = require("chai").expect;
var ParamMapper = require( "../impl/ParamMapper" );

describe("Parameter Mapper", function() {
    describe("instationation", function() {
        it( "one mapping", function() {
            var mapper = new ParamMapper([
                "query://test"
            ]);

            expect( mapper.mappings ).to.exist;
            expect( mapper.mappings.length ).to.exist;
            expect(mapper.mappings).to.not.be.empty;

            // expect( mapper.mappings ).to.equal( "" );

            // expect(redHex).to.equal("ff0000");
        });
    });
});