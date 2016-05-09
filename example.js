/**
 * Simple example how to use the rest-api-mock.
 *
 * @author asiebert (aka drdrej)
 */


// import api:
var Server = require("./server.js" );

// creates a server instance
var server = new Server({
    name: "ColGate"
});

// create an initial state object
server.state({ });

// -------------------------------------
// declare endpoints for POST/GET etc.
// -------------------------------------
server.on({
    method: "post",
    endpoint: "/item"
}).response(function ( body ) {
    // TODO: here handle post befor return json.

    return {
        user: "Test User"
    };
});


 server.on({
 method: "get",
 endpoint: "/item"
 }).response(
         function () {
            return { user: "Test User" };
         });


server.on({
    method: "get",
    endpoint: "/items"
}).forward(
    "https://127.0.0.1:8080/path",
    function ( fwdResult ) {
        return fwdResult;
    });


// after all endpoints are decalred, start the server.
server.start();

// ... and you are ready to run a client against.