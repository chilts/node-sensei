// --------------------------------------------------------------------------------------------------------------------
//
// serialise.js - wrap and unwrap values into objects.
//
// Prior to storing in the datastore, values are wrapped and unwrapped so that they contain other meta information
// such as a timestamp and the serialised type being used.
//
// There are only two exported functions which are wrap() and unwrap(), both of which you had to provide which type you
// need. Each return a function you can use to serialise and deserialise your data, which also includes the
// meta-information too.
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
