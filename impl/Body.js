var body =  function body( path ) {
    if( !inReq.body ) {
        console.error( "Body is NULL/undefined, couldn't request body." );
        return undefined;
    }

    return jsonpointer.get( inReq.body, path );
};


module.exports = body;