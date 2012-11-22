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

Memory.prototype.set = function(bucket, key, value, done) {
    var self = this;

    if ( typeof self.keys[bucket] === 'undefined' ) {
        self.keys[bucket] = {};
    }

    process.nextTick(function() {
        self.keys[bucket][key] = value;
        done(null, 'OK');
    });
}

Memory.prototype.get = function(bucket, key, done) {
    var self = this;

    if ( self.keys[bucket] ) {
        if ( self.keys[bucket][key] ) {
            process.nextTick(function() {
                done(null, self.keys[bucket][key]);
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
