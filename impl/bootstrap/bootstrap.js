var Logger = require('bunyan');
var log = new Logger({
    name: 'moki-log',
    level: "error",
    streams : [
        {
            stream: process.stdout,
            level: 'info'
        },
        {
            path: './moki-trace.log',
            level: 'trace'
        }
    ],

    src:true
});


/*
{
    name: <string>,                     // Required
    level: <level name or number>,      // Optional, see "Levels" section
    stream: <node.js stream>,           // Optional, see "Streams" section
    streams: [<bunyan streams>, ...],   // Optional, see "Streams" section
    serializers: <serializers mapping>, // Optional, see "Serializers" section
    src: <boolean>,                     // Optional, see "src" section

    // Any other fields are added to all log records as is.
    foo: 'bar',
...
}
*/

function storyFile(cwd, story) {
    var file = (cwd + "/usecases/" + story + ".json");
    log.trace("... use story-file: %s", file);

    return file;
}

function loadStory( cwd, story ) {
    var jsonfile = require('jsonfile');

    var file = storyFile(cwd, story);
    console.log( "# Setup story: %s", file  );

    var rval = jsonfile.readFileSync(file);
    console.log( ".. *.mock.json loaded: " + ( rval ? "yes" : "no") );

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
function setupUsecase(server, root, actions, usecase) {
    console.log( ".. setup usecase: " + usecase.name);
    
    if( usecase.action ) {
        var S = require( "string" );
        var _ = require( "underscore" );

        if( _.isString( usecase.action ) ) {
            if (S(usecase.action).startsWith("http://")) {
                server.on(usecase.on).forward(usecase.action);
                return;
            } else {
                var file;


                var aPattern = S(actions);
                var rel = aPattern.replaceAll('*', usecase.action).s;

                var path = require("path");

                log.trace();

                console.log(">>> relative path.");
                console.log("... root: " + root);
                console.log("... rel: " + rel);

                file = (path.dirname(root) + "/" + rel);
                // file = path.resolve ... relative(root, rel));
                // file = path.resolve();

                var js = require(file);
                var jsDef = js.apply();

                server.on(usecase.on).response(jsDef.args, jsDef.call);

                return;
            }
        } else if( _.isObject(usecase.action) ) {
            server.on(usecase.on).ok( usecase.action ); // numbers will be interpreted as error mocks
        }
    } else
        throw "Not supported";

}

module.exports = function(build, config, cwd, story) {
    var Server = require("../../server.js" );
    var server = new Server(config);

    if( story ) {
        var sf = storyFile(cwd, story);
        var loaded = loadStory(cwd, story);

        var actionsPattern = loaded.actions;
        var cases = loaded.mocks;

        var _ = require( 'underscore' );
        _.each( cases, function( usecase ) {
            setupUsecase(server, sf, actionsPattern, usecase); // server, storyfile, actions, usecase
        });
    }

    server.start();
};
