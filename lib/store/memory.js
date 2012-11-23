// --------------------------------------------------------------------------------------------------------------------
//
// memory.js - a memory store for KeyBase
//
// --------------------------------------------------------------------------------------------------------------------
//
// Copyright (c) 2012 AppsAttic Ltd, <chilts@appsattic.com>
//
// --------------------------------------------------------------------------------------------------------------------

var util = require('util');
var Store = require('./store.js');

var serialise = require('../serialise.js');

var wrap   = serialise.wrap('json');
var unwrap = serialise.unwrap('json');

// --------------------------------------------------------------------------------------------------------------------

function Memory(opts) {
    var self = this;
    opts = opts || {};

    // just remember the keys in memory
    self.keys = {};

    return self;
}

util.inherits(Memory, Store);

// --------------------------------------------------------------------------------------------------------------------

// set(bucket, key, value, done)
//
// Sets a key in the bucket specified. The bucket will pop into existance if it doesn't already exist.
Memory.prototype.set = function(bucket, key, value, done) {
    var self = this;

    if ( typeof self.keys[bucket] === 'undefined' ) {
        self.keys[bucket] = {};
    }

    process.nextTick(function() {
        self.keys[bucket][key] = wrap(value);
        done(null, 'OK');
    });
}

// get(bucket, key, done)
//
// Gets a key from a bucket, but only if both the bucket and key exist.
Memory.prototype.get = function(bucket, key, done) {
    var self = this;

    if ( self.keys[bucket] ) {
        if ( self.keys[bucket][key] ) {
            process.nextTick(function() {
                done(null, unwrap(self.keys[bucket][key]));
            });
        }
        else {
            process.nextTick(function() {
                done(new Error("Key does not exist in this bucket"));
            });
        }
    }
    else {
        process.nextTick(function() {
            done(new Error('Bucket does not exist'));
        });
    }
}

// --------------------------------------------------------------------------------------------------------------------

module.exports = Memory;

// --------------------------------------------------------------------------------------------------------------------
