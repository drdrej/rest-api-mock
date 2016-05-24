var build = require( "./build.json" );
var app = require('commander');

app
    .version( build.version ) // .option('-c, --case <case>', 'Add jira case id (used as folder)')
    .option('-c, --config <config>', 'path to mocky.json' )
    .option('-l, --log', 'Use log');



app
    .command( 'exec <cmd>' )
    .action(function(env) {
        console.log('running "%s"', env);

        var cwd = process.cwd();
        console.log( "Current directory: " + cwd );


        var configFile;
            if(!app.config) {
              configFile  = (cwd + "/mocky.json" );
            } else {
              configFile  = (cwd + "/" + app.config);
            }

        console.log( "Use config: " + configFile);
            var jsonfile = require('jsonfile');

            var config = jsonfile.readFileSync(configFile);
            console.log( "Config loaded: " + ( config ? "yes" : "no" ) );

            var bootstrap = require("../impl/bootstrap" );
            bootstrap(config);
    });

app.parse(process.argv);

/*
if (!cli.case) {
    console.error("Option --case is required!");
    return;
}
*/

/*
var log = function log(msg) {
    if( cli.log ) {
        console.log( msg );
    }
};




var usePort = function() {
    if( cli.port && cli.port > 0 ) {
        return cli.port;
    }

    return DEFAUL_PORT;
};
*/
