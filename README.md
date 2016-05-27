# Moki - [experimental]
*... mocks your backend*

Moki is an easy way to mock a rest-api and is usefull for Web- & Mobile-developers
to build rest-based clients without the needs to run a real server.

### Attention:
[![Build Status](https://travis-ci.org/drdrej/rest-api-mock.png?branch=master)](https://travis-ci.org/drdrej/app-buildr)
*This software is permanently in development, so please use it carefuly.*


## Goals & Features

### Simple way to setup a rest-api.

### Run a rest-api.

## Static json response

## Getting started

### Installation

To install moki global accessible you can use this cli command:

   > npm install -g moki

   **Important**: nodejs from V.6 doesn't support EventEmitter. So you will get a warning in console.

   Change to (project-) directory where you want to manage your rest-api mocks.


### Configure mocks

To create a mock for a specified rest-request you can use a json-based dsl.
This json file with some mock-declarations inside we will call 'usecase'.

**Example:**
````json
{
  "mocks" : [{

    "on" : {
      "endpoint": {
        "method": "get",
        "pattern": "/items",

        "path": "/items"
      }

    },

    "action" : { "items" : ["Apple", "Pineapple"] }
  }]
}
````

Save this content in a text file './usecases/usecase-1.json'.


### Run

To run moki with above described usecase open command line and enter:

   >moki run usecase-1

Moki will resolve the name of usecase to a file, load the mock-declarations and start the server at
http://localhost:8383/.

To test the endpoint open in the browser this url:
   http://localhost:8181/items


## More explanations

### Command-line usage

**Example:**
     > moki -c ./configs/simple.moki.json run usecase-2

In this example moki runs a usecase called "usecase-2". Moki resolves this name to path ./usecases/usecase-2.json.
There you can find the config for usecase/story. (TODO: need to clarify usecase vs story)

**Options:**

- c : path, relative to current directory. this path shows at moki.json main config file for the server.

**Command:**
At this moment only one command 'run' is supported.
With 'run' command you can run a server with usecase-configs.

**Example: (usecase.json):**
Moki understands json, so you can declare your usecases. every usecase is a moki of a rest-api-endpoint call.

````json
{
  "actions" : "../actions/*.js",

  "mocks" : [{
    "name": "endpoint-1",
    "description": "simple get example to create an get-endpoint",

    "on" : {
      "endpoint": {
        "method": "get",
        "pattern": "/item/:id",
        "path": "/item/5"
      },

      "log": true
    },

    "action" : "simple-success-action"
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
# Another Mock-Servers

* https://www.npmjs.com/package/mock-restful
* https://www.npmjs.com/package/api-mock
* https://www.npmjs.com/package/mock-rest-request
* https://github.com/typicode/json-server
* http://www.mock-json-api.com/
* http://www.mock-server.com/where/npm.html


## for swagger
* https://www.npmjs.com/package/swagger-mock
* https://github.com/dzdrazil/swagger-mock-api
* https://www.npmjs.com/package/swagger-server


##  ???
http://wiremock.org

# Versioning

I will use the 0.0.0 versioning pattern. I've started the publishing on npm with version 1.0.0. Even until this moment the application is not production stable. I plan to get usefull stability with the release 1.1.0. Until this moment i will increment the minor number with every publishing.

## History

**v.1.0.12** project (rest-api-mock) was renamed to moki and republished at npm.

**before v1.0.11** *this application was published as npm module called 'rest-api-mock'.*


# The MIT License (MIT)

Copyright (c) 2016 Andreas Siebert

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
