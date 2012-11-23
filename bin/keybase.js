// --------------------------------------------------------------------------------------------------------------------
//
// keybase.js - a key/value store which is the cornerstone of Sensei
//
// --------------------------------------------------------------------------------------------------------------------
//
// Copyright (c) 2012 AppsAttic Ltd, <chilts@appsattic.com>
//
// --------------------------------------------------------------------------------------------------------------------

var url  = require('url');
var http = require('http');
var MemoryStore = require('../lib/store/memory.js');

// --------------------------------------------------------------------------------------------------------------------
// setup

// do the right store according to the config
var store = new MemoryStore();

// --------------------------------------------------------------------------------------------------------------------

function listener(req, res) {
    console.log((new Date()).toISOString() + ' : http://' + req.headers.host + req.url);

    var parts = url.parse(req.url, true);

    switch (parts.pathname) {
    case '/set':
        set(req, res, parts);
        break;
    case '/get':
        get(req, res, parts);
        break;
    default:
        res.writeHead(404);
        res.end('Not Found\n');
        break;
    }
}

function set(req, res, parts) {
    store.set(parts.query.bucket, parts.query.key, parts.query.value, function(err, result) {
        if (err) {
            res.writeHead(500);
            res.end(err);
            return;
        }
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(result);
    });
}

function get(req, res, parts) {
    store.get(parts.query.bucket, parts.query.key, function(err, result) {
        if (err) {
            res.writeHead(500);
            res.end(err);
            return;
        }
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(result);
    });
}

// --------------------------------------------------------------------------------------------------------------------
// start up the server

var server = http.createServer(listener);
server.listen(8001, function(req, res) {
    console.log("Listening on port 8001");
});

// --------------------------------------------------------------------------------------------------------------------
