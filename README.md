# rest-api-mock

simple way to create mocks in nodejs.

######Important:
1. Experimental
2. Not tested
3. not fo"

## Example

````java
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
````