function loadStory( cwd, story ) {
    var jsonfile = require('jsonfile');

    var file = cwd + "/usecases/" + story + ".json";

    var rval = jsonfile.readFileSync(file);
    console.log("Story loaded: " + ( rval ? "yes" : "no" ));

    return rval;
}

/**
 *
 * supports this format:
 * ----------------------------------------
 * {
    "on" : {
      "name": "endpoint-1",
      "description": "simple get example to create an get-endpoint",

      "endpoint": {
        "method": "get",
        "pattern": "/item/:id",
        "path": "/item/5"
      },

      "log": true
    },

    "action" : "simple-success-action"
  }
 */
function setupUsecase(server, usecase) {
    console.log( ".. setup usecase: " + usecase.name);
}

module.exports = function(build, config, cwd, story) {
    var Server = require("../server.js" );
    var server = new Server(config);

    if( story ) {
        var loaded = loadStory(cwd, story);

        var actionsPattern = loaded.actions;
        var cases = loaded.story;

        var _ = require( 'underscore' );
        _.each( cases, function( usecase ) {
            setupUsecase(server, usecase);
        });
    }

    server.start();
};
