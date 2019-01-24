var http = require('http');
var static = require('node-static');
var file = new static.Server('.', {
    cache: 0
});


function accept(req, res) {
    if (req.url == '/data/store.json') {
        file.serve(req, res);
    } else {
        file.serve(req, res);
    }
}

http.createServer(accept).listen(8080);
