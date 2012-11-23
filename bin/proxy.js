// --------------------------------------------------------------------------------------------------------------------
//
// proxy.js - the proxy server which proxies all the other services
//
// --------------------------------------------------------------------------------------------------------------------
//
// This program acts as a proxy to all the other services. You may or may not want to run all services on each machine
// but that's for you to decide what your load and/or use-cases will be.
//
// To add a new service to the pool, hit this server on:
//
// $ curl -v localhost:8000/service/add?host=queue.localhost&port=9001
//
// To remove a service, hit this:
//
// $ curl -v localhost:8000/service/remove?host=queue.localhost&port=9001
//
// Note: services may be local or remote. You may have as many as you like on each server and you may also run as few
// or as many as you like in total. In theory, you should tell every proxy of any new ones and remove old ones from
// every proxy too. (Note: this may be automated in the future.)
//
// --------------------------------------------------------------------------------------------------------------------
//
// Copyright (c) 2012 AppsAttic Ltd, <chilts@appsattic.com>
//
// --------------------------------------------------------------------------------------------------------------------

var bouncy = require('bouncy');

// --------------------------------------------------------------------------------------------------------------------

// this config should be dynamic and changeable
var hosts = {
    'keybase.cheetah' : 8001,
    'queue.cheetah'   : 8002,
    'notify.cheetah'  : 8003,
    'storage.cheetah' : 8004,

    'keybase.127.0.0.1.xip.io' : 8001,
    'queue.127.0.0.1.xip.io'   : 8002,
    'notify.127.0.0.1.xip.io'  : 8003,
    'storage.127.0.0.1.xip.io' : 8004,

    'keybase.localhost.appsattic.com' : 8001,
    'queue.localhost.appsattic.com'   : 8002,
    'notify.localhost.appsattic.com'  : 8003,
    'storage.localhost.appsattic.com' : 8004,
};

// --------------------------------------------------------------------------------------------------------------------

bouncy(function (req, bounce) {
    var host = req.headers.host.split(':')[0];

    console.log((new Date()).toISOString() + ' : http://' + host + req.url);

    if ( hosts[host] ) {
        bounce(hosts[host]);
    }
    else {
        // Not Found
        var res = bounce.respond();
        res.writeHead(404);
        res.end('Not Found\n');
    }
}).listen(8000, function() {
    console.log((new Date()).toISOString() + ' : Listening on port 8000');
});

// --------------------------------------------------------------------------------------------------------------------
