# Moki - [experimental]
*... mocks your backend*

Moki is an easy way to mock a rest-api and is usefull for Web- & Mobile-developers
to build rest-based clients without the needs to run a real server.

### Status
[![Build Status](https://travis-ci.org/drdrej/rest-api-mock.png?branch=master)](https://travis-ci.org/drdrej/app-buildr)
[![HitCount](https://hitt.herokuapp.com/{username||org}/{project-name}.svg)](https://github.com/{username||org}/{project-name})
[![Gitter](https://badges.gitter.im/drdrej/rest-api-mock.svg)](https://gitter.im/drdrej/rest-api-mock?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Dependency Status](https://david-dm.org/drdrej/rest-api-mock.svg)](https://david-dm.org/drdrej/rest-api-mock)

**Important:** *This software is permanently in development, so please use it carefuly.*

**Important**: nodejs from V.6 doesn't support EventEmitter. So you will get a warning in console. currently i test this project only until v5.




## Why? [![start with why](https://img.shields.io/badge/start%20with-why%3F-brightgreen.svg?style=flat)](http://www.ted.com/talks/simon_sinek_how_great_leaders_inspire_action)

Frontend-developers doesn't like to work with broken services.
They prefer to write UI code and expects a full working service with predictable behaviour.
Later, if a product has a bug and for example fails in user acceptance tests, then a frontend-developer
 is the first instance who will be asked by the customer. The web-developer has to explain why the application doesn't
 work as expected. Even if the problem is a produced by a broken service.

Moki is a way to setup a rest-api with static (and dynamic) responses. So a web-developer get simple
a way to develop against a not implemented service. Web-developer can configure response in different way,
depends on a catched request and matched parameters.

* [Roadmap](https://github.com/drdrej/rest-api-mock/blob/master/docs/Roadmap.md)

## Getting started

### Requirements

* nodejs
* npm

### Installation

Install moki with npm. To install moki global accessible you can use the -g option:

   > npm install -g moki



### Working directory
   Change to (project-) directory where you want to manage your rest-api mocks.

### Configure mocks

To create a mock for a specified rest-request moki supports a json-based dsl.
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
   http://localhost:8383/items

**Important:** http-Port is configurable

## More docs
* [CLI](https://github.com/drdrej/rest-api-mock/blob/master/docs/CLI.md)
* [Static get response](https://github.com/drdrej/rest-api-mock/blob/master/docs/MOCK_Static_get_Response.md)
* [More docs](https://github.com/drdrej/rest-api-mock/blob/master/docs/MOCK_setup_programmatically.md)

# Alternative solutions

There are already some solutions on the market. Check them out. (*List ist not complete*)

## Node based solutions
* https://www.npmjs.com/package/mock-restful
* https://www.npmjs.com/package/api-mock
* https://www.npmjs.com/package/mock-rest-request
* https://github.com/typicode/json-server
* http://www.mock-json-api.com/

## More mocking servers
* http://www.mock-server.com/where/npm.html
http://wiremock.org

## Swagger based mocks
* https://www.npmjs.com/package/swagger-mock
* https://github.com/dzdrazil/swagger-mock-api
* https://www.npmjs.com/package/swagger-server

## Services
* https://www.mockable.io/
* http://mocky.io

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
