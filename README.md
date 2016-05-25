# Mocky a rest-api-mock

This CLI-application is a simple way to create mocks in nodejs.

######Important: (currently)
1. Experimental
2. Not tested
3. dev in progress (api is changing)

## Goals

* Simple way to setup a mocked rest-api.
* Usefull for Web- & Mobile-developers to build rest-based clients without running a real server.


## Installation

   > npm install --save rest-api-mock

   **Important**: nodejs from V.6 doesn't support EventEmitter. So you will get a warning in console.

# Command-line usage

Run mocky from

It is possible to run mocky (Command) to start a mock-server.
If you have installed rest-api-mock with -g option, you can run
it in this way:

**Example:**
     > mocky -c ./configs/simple.mocky.json run usecase-2

In this example mocky runs a usecase called "usecase-2". Mocky resolves this name to path ./usecases/usecase-2.json.
There you can find the config for usecase/story. (TODO: need to clarify usecase vs story)

**Options:**

- c : path, relative to current directory. this path shows at mocky.json main config file for the server.

**Command:**
At this moment only one command 'run' is supported.
With 'run' command you can run a server with usecase-configs.

**Example: (usecase.json):**
Mocky understands json, so you can declare your usecases. every usecase is a mock of a rest-api-endpoint call.

````json
{
  "actions" : "../actions/*.js",

  "mocks" : [{
    "name": "endpoint-1",
    "description": "simple get example to create an get-endpoint", /* optional */

    "on" : {
      "endpoint": {
        "method": "get",
        "pattern": "/item/:id",
        "path": "/item/5"
      },

      "log": true /* optional | log = false is default.*/
    },

    "action" : "simple-success-action" /* required | name of action-file */
  },

  {
      "on" : {
        "endpoint": {
          "method": "get",
          "pattern": "/fwd/:id",
          "path": "/fwd/1"
        },

        "log": true
      },

      "action" : "http://localhost:8181/item/5"
  }]
}
````


# Use programmatically

## Initialize server
````JavaScript
    var Mock = require( "rest-api-mock" );

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

## Forward 
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


## Bad request

````java

server.on({
    name: "err-example-2",
    description: "error with message",

    endpoint : {
        method: "get",
        pattern: "/err/:id", // TODO: maybe move to specs! here only usecase!!! match later...
        path: "/err/2"
    },

    log: true
}).error( 404, "This request is broken" );

Second parameter is the error-message abd is optional.

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


### for swagger 
* https://www.npmjs.com/package/swagger-mock
* https://github.com/dzdrazil/swagger-mock-api
* https://www.npmjs.com/package/swagger-server
* 

