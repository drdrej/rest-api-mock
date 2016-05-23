/**
 * Simple example how to use the rest-api-mock.
 *
 * @author asiebert (aka drdrej)
 */

// import api:
var Server = require("./server.js" );

// creates a server instance
var server = new Server({
    name: "example"
});

server.on({
    name: "xyz",
    description: "dasdadasda",

    endpoint : {
        method: "get",
        pattern: "/item/:id",
        path: "/item/5"
    },

    log: true
}).response([
        "json:///json/path",
        "query://param1",
        "form://name1"
    ],

    function ( jsonPathVal, qP1, fName1 ) {
        return { success: ("Test" + jsonPathVal + ":" + qP1 + ":" + fName1) };
    });


server.on({
    name: "yyyy",
    description: "dasdasdasd",

    endpoint : {
        method: "get",
        pattern: "/fwd/:id", // TODO: maybe move to specs! here only usecase!!! match later...
        path: "/fwd/1"
    },

    log: true
}).forward( "http://localhost:8383/item/5" );


server.start();
