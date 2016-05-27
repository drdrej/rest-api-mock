var _ = require( "underscore" );
var S = require( "string" );

/**
 * Mapps list/array of argument mappings to a method-call.
 *
 * @param mappings
 * @returns {ParamMapper}
 *
 * @constructor
 */
var ParamMapper = function( mappings ) {
    this.mappings = [];

    // (!mappings && mappings != null ) ?
    // _.each(list, iteratee, [context])

    function _parseMapping( mapping ) {
        console.log( ">>> parse mapping: " + mapping );

        var splitted = mapping.split( "://" );

        return {
            type: splitted[0],
            key:  splitted[1]
        }
    }

    if( !mappings
          && mappings !== 0
          && mappings !== false ) {

          mappings = [];
    }

    if( _.size( mappings ) < 1 ) {
        return this;
    }

    _.each( mappings, function(mapping) {
        this.mappings.push( _parseMapping(mapping) );
    }, this);
};

function _chooseParamType( mapping ) {
    if( !mapping.type ) {
        console.error( "!! param-type is not supported." );
        return;
    }

    if( mapping.type === "path" ) {
        return 'params';
    } else if( mapping.type === "query" ) {
        return "query";
    } else if( mapping.type === "body" || mapping.type === "json") {
        return "body";
    } else {
        throw Error( "broken param type: " + mapping.type );
    }
}

ParamMapper.prototype._get = function(httpReq, mapping) {
    var type = _chooseParamType(mapping)
    var params = httpReq[type];

    if (!params) {
        console.warn("!! params-object of type " + mapping.type + " is not defined.");
        return;
    }

    if (!mapping.key) {
        console.error("!! mapping has no key.");
        return;
    }

    var S = require( "string" );

    if( !S(mapping.key).startsWith( "/" ) )
        mapping.key = "/" + mapping.key;

    try {
        var jsonpointer = require('jsonpointer.js');

        var rval = jsonpointer.get(params, mapping.key);
        console.log(".. inject param: " + mapping.type + "://" + mapping.key + " = " + rval);

        return rval;
    } catch(e) {
        console.error( "ERROR: " + e );
        console.error( e );
        return undefined;
    }
};

ParamMapper.prototype.map = function ( httpReq ) {
    var rval = [];

    _.each( this.mappings ,
           function( mapping ) {
         if( !mapping ) {
             console.log( "!! sckip mapping!" );
             return;
         }

         var val = this._get(httpReq, mapping);
         rval.push(val);
   }, this);

   return rval;
};

module.exports = ParamMapper;
