var build = require("./build.json");
var app = require('commander');


app
    .version(build.version)
    .option('-c, --config <config>', 'config-file. (*.moki.json) - optional')
    .option('-v, --version <version>', 'api version' )
    .option('-l, --log', 'Use log');

app
    .command('run <story>' )
    .action(function ( story ) {
        console.log( "----------------------------------------");
        console.log( "# Version: " + build.version );
        console.log( "# (c) A.Siebert aka drdrej" );
        console.log( "========================================");
        console.log( "  ... runs a mock for your api." );

        console.log( "");
        
        console.log('running usecase: "%s"', story);

        var cwd = process.cwd();
        console.log("Current directory: " + cwd);

        var configFile;
        if (!app.config) {
            configFile = (cwd + "/moki.json" );
        } else {
            configFile = (cwd + "/" + app.config);
        }

        console.log("# .. Use config: " + configFile);
        var jsonfile = require('jsonfile');

        var config;

         try {
                 config = jsonfile.readFileSync(configFile, {
                         throws: false
                 });
         } catch (e){
                 console.log( "# .. ! couldn't load moki config file. use defaults." );
         }

        if( !config || config === null ) {
            config = {
              "name" : "Example",
              "port" : 8181
            };
        }


        console.log("# .. Config loaded: " + ( config ? "yes" : "no" ));
        console.dir(config);

        var bootstrap = require("../impl/bootstrap/bootstrap");

        bootstrap(build, config, cwd, story);
    });

app.parse(process.argv);