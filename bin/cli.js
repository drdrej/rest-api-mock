var build = require("./build.json");
var app = require('commander');

app
    .version(build.version)
    .option('-c, --config <config>', 'config-file. (*.mocky.json) - optional')
    .option('-v, --version <version>', 'api version' )
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