//strict

// TODO: reimpl. in > v.1.0.7
var jsonpointer = require( 'jsonpointer.js' );


Server.prototype.state = function( initial ) {
    this.appState = initial;
};

Server.prototype.get = function( path ) {
    return jsonpointer.get(this.appState, path );
};




