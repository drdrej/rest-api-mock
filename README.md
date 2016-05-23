# rest-api-mock

This CLI-application is a simple way to create mocks in nodejs.

######Important: (currently)
1. Experimental
2. Not tested

## Installation

   > npm install --save rest-api-mock

   **Important**: nodejs from V.6 doesn't support EventEmitter. So you will get a warning in console.

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
## Another Mock-Servers 
* https://www.npmjs.com/package/mock-restful
* https://www.npmjs.com/package/api-mock
* https://www.npmjs.com/package/mock-rest-request
* https://github.com/typicode/json-server
* http://www.mock-json-api.com/
* http://www.mock-server.com/where/npm.html
