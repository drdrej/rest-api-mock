var build = require("./build.json");
var app = require('commander');

app
    .version(build.version) // .option('-c, --case <case>', 'Add jira case id (used as folder)')
    .option('-c, --config <config>', 'path to mocky.json')
    .option('-l, --log', 'Use log');


app
    .command('run <story>' )
    .action(function ( story ) {
        console.log('running usecase: "%s"', story);

        var cwd = process.cwd();
        console.log("Current directory: " + cwd);

        var configFile;
        if (!app.config) {
            configFile = (cwd + "/mocky.json" );
        } else {
            configFile = (cwd + "/" + app.config);
        }

        console.log("Use config: " + configFile);
        var jsonfile = require('jsonfile');

        var config = jsonfile.readFileSync(configFile);
        console.log("Config loaded: " + ( config ? "yes" : "no" ));

        var bootstrap = require("../impl/bootstrap");

        bootstrap(build, config, cwd, story);
    });

app.parse(process.argv);

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
