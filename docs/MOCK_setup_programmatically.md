# Mock programmatically

## Initialize server
````JavaScript
    var Mock = require( "moki" );

    var mock = new Mock({
        name: "Example"
    });
````

## Mock

### Simple GET response

... returns an json-object in http-response.

````JavaScript
mock.on({
    name: "usecase-get-item-1",

    endpoint : {
        method: "get",
        pattern: "/item/:id",
        path: "/item/5"
    }
}).response([
        "body:///json/path",
        "query://param1",
        "path://name1"
    ],

    function ( p1, p2, p3 ) {
        return {
           success: true,
           p1 : p1,
           p2 : p2,
           p3 : p3
        };
    });

````

### Simple POST response
...

### Forward
Listen on path /fwd/1 (for pattern /fwd/:id) and forward request to passed url. In this example
it will forward to "http://localhost:8383/item/5".

````JavaScript
mock.on({
    name: "usecase-forward",

    endpoint : {
        method: "get",
        pattern: "/fwd/:id",
        path: "/fwd/1"
    },
}).forward( "http://localhost:8383/item/5" );

````


### Bad request

````java

server.on({
    name: "err-example-2",
    description: "error with message",

    endpoint : {
        method: "get",
        pattern: "/err/:id",
        path: "/err/2"
    },

    log: true
}).error( 404, "This request is broken" );


````
Second parameter is the error-message abd is optional.


## Start mock
All endpoints and attached usecases will be registred and the mock-server will be started.

````java
mock.start();
````

## Stop mock
````java
mock.stop();
````