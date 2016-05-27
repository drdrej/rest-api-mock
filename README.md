# Moki - [experimental]
*... mocks your backend*

Moki is an easy way to mock a rest-api and is usefull for Web- & Mobile-developers
to build rest-based clients without the needs to run a real server.

### Attention:
[![Build Status](https://travis-ci.org/drdrej/rest-api-mock.png?branch=master)](https://travis-ci.org/drdrej/app-buildr)
*This software is permanently in development, so please use it carefuly.*

**Important**: nodejs from V.6 doesn't support EventEmitter. So you will get a warning in console. currently i test this project only until v5.

## Goals & Features

* Simple way to setup a rest-api.
* Run a rest-api.
* Static & dynamic json responses


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
