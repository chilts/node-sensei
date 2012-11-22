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
var connect = require('connect');
var MemoryStore = require('../lib/store/memory.js');

// --------------------------------------------------------------------------------------------------------------------

var store = new MemoryStore();

var app = connect()
    .use(connect.logger('dev'))
    // .use(connect.query())
    .use(function(req, res) {
        // console.log('url=' + req.url);

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
    })
;

var keys = {};

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
    console.log(parts.query.bucket);
    console.log(parts.query.key);

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

app.listen(8001, function() {
    console.log('Listening on port 8001');
});

// --------------------------------------------------------------------------------------------------------------------
