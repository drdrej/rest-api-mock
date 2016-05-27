# Command-line interface

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
