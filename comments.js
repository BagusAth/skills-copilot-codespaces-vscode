// Create web server
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var comments = [];

var server = http.createServer(function(req, res) {
    var parseUrl = url.parse(req.url, true);
    var pathname = parseUrl.pathname;
    var query = parseUrl.query;

    if (pathname === '/') {
        fs.readFile('./index.html', function(err, data) {
            if (err) {
                res.end('404 Not Found');
            } else {
                res.end(data);
            }
        });
    } else if (pathname === '/post') {
        var comment = query.comment;
        comments.push(comment);
        res.end(JSON.stringify(comments));
    } else {
        fs.readFile('.' + pathname, function(err, data) {
            if (err) {
                res.end('404 Not Found');
            } else {
                res.end(data);
            }
        });
    }
});

server.listen(3000, function() {
    console.log('Server running at http://