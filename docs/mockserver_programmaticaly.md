# How to create & run a Mock programmaticaly

## Initialize server
````java
    var Mock = require( "rest-api-mock" );

    var mock = new Mock({
        name: "Example"
    });
````

## Mock

### Simple GET response

... returns an json-object in http-response.

````java
mock.on({
    name: "usecase-get-item-1",
    description: "Usecase",

    endpoint : {
        method: "get",
        pattern: "/item/:id",
        path: "/item/5"
    },

    log: true
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

## Forward
Listen on path /fwd/1 (for pattern /fwd/:id) and forward request to passed url. In this example
it will forward to "http://localhost:8383/item/5".

````java
mock.on({
    name: "usecase-forward-to-original",
    description: "...",

    endpoint : {
        method: "get",

        pattern: "/fwd/:id",

        path: "/fwd/1"
    },

    log: true
}).forward( "http://localhost:8383/item/5" );

````



## Start mock
All endpoints and attached usecases will be registred and the mock-server will be started.

````java
mock.start();
````

## Stop mock
````java
mock.stop();
````
