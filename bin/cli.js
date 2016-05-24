var build = require( "./build.json" );
var cli = require('commander');

cli
    .version( build.version ) // .option('-c, --case <case>', 'Add jira case id (used as folder)')
    .option('-l, --log', 'Use log')
    .parse(process.argv);

console.log( "Current directory: " + process.cwd() );

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
