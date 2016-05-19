# rest-api-mock

simple way to create mocks in nodejs.

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
        method   : "get",
        endpoint : "/example"
        
    }).response( function() {
        return { ... }; 
    });
````

### Simple POST response

## Forward 

````java
mock.on({
    method: "get",
    endpoint: "/xyz"
}).forward(
    "https://www.xyz.de/path",
    function ( forwardResult ) {
        return forwardResult; // callback to modify json-result/response bevore it goes to client.
});
````



## Start mock
````java
server.start();
````


## Another Mock-Servers 
* https://www.npmjs.com/package/mock-restful
* https://www.npmjs.com/package/api-mock
* https://www.npmjs.com/package/mock-rest-request
* https://github.com/typicode/json-server
* http://www.mock-json-api.com/
* http://www.mock-server.com/where/npm.html
