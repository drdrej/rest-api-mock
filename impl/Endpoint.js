var _ = require( "underscore" );
var ParamMapper = require( "./ParamMapper" );


var Endpoint = function(endpoint) {
    this.method  = endpoint.method;
    this.pattern = endpoint.pattern;

    this.cases = [];
};

Endpoint.prototype.findCase = function( endpoint ) {
    var usecase = this.cases[ endpoint.path ];

    if( !usecase ) {
        console.error( "couldn't find usecase" );
        return;
    }





};

Endpoint.prototype.addCase = function( endpoint ) {
    /*if( _.isEmpty(this.cases) ) {

    }

    this.cases.push( new Usecase() );
    */
};

Endpoint.prototype._callback = function( inReq, inRes, inNext ) {
        console.log( "catched " + this.method + " rest-call of " +  this.pattern );

        // if(hasLog)
        //    log(inReq);

        var usecase = this.matchCase(inReq);

        if( !usecase ) {
            console.error( "usecase not found." );
            return inNext();
        }

        inRes.send({
            success:true
        });

        /*
        var paramMapper = new ParamMapper(mappings);

        var json;

        if( !resultFnc ) {
            json = {};
        } else {
            var params = paramMapper.map(inReq);
            json = resultFnc.apply(resultFnc, params);
        }

        if( json == null ) {
            json = {};
        }

        inRes.send(json);

        return inNext();

        // else -?> skip ---> am ende muss ein default response zurueck gegeben.
        */
};

Endpoint.prototype.useBy = function( server ) {
    console.log( "setup endpoint "
        + this.method + ": "
        + this.pattern);

    server[this.method] (this.pattern, this._callback);
};



module.exports = Endpoint;