// --------------------------------------------------------------------------------------------------------------------
//
// wrap.js - a small function to wrap the values being passed in.
//
// --------------------------------------------------------------------------------------------------------------------
//
// Copyright (c) 2012 AppsAttic Ltd, <chilts@appsattic.com>
//
// --------------------------------------------------------------------------------------------------------------------

// wrap(type)
function wrap(type) {
    if ( type === 'json' ) {
        return function(val) {
            return JSON.stringify({
                ts   : Date.now(), // format 1353647539309 (ms since epoch), ie. 1353647539.309s since epoch
                type : type,
                val  : val,
            });
        };
    }
    else {
        throw new Error('Unknown wrap type : ' + type);
    }
}

// unwrap(type)
function unwrap(type) {
    if ( type === 'json' ) {
        return function(blob) {
            return JSON.parse(blob).val;
        };
    }
    else {
        throw new Error('Unknown unwrap type : ' + type);
    }
}

// --------------------------------------------------------------------------------------------------------------------

module.exports.wrap = wrap;
module.exports.unwrap = unwrap;

// --------------------------------------------------------------------------------------------------------------------
