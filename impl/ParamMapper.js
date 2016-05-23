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

    if( _.size( mappings ) < 1 ) {
        return this;
    }

    _.each( mappings, function(mapping) {
        this.mappings.push( _parseMapping(mapping) );
    }, this);
};

ParamMapper.prototype._get = function(httpReq, mapping) {
    if( !mapping.type ) {
         console.error( "!! param-type is not supported." );
         return;
    }

    var params = httpReq[mapping.type];

    if( !params ) {
        console.warn( "!! params-object of type " + mapping.type + " is not defined." );
        return;
    }

    if( !mapping.key ) {
        console.error( "!! mapping has no key." );
        return;
    }

    return httpReq[mapping.key];
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
