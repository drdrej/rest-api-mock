# rest-api-mock
simple rest api mock

simple way to create ocks in nodejs.

## Example

''''
    var Server = require( "rest-api-mock" );

    var server = new Server({
        name: "Example"
    });


    server.on({
        method   : "post",
        endpoint : "/example"
    }).response( function() {
        return { ... };
    });

    server.on({
        method   : "get",
        endpoint : "/example"
    }).response( function() {
        return { ... };
    });

    server.start();

''''