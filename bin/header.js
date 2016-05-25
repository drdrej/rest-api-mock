// .font('x', 'Doom', 'magenta' ) | Basic

var art = require("ascii-art");
art.font('Moki', 'Doom', 'red',
    function(rendered) {
        console.log(rendered);

        require( "./cli" );
    });