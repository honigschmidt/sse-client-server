var http = require("http");
var fs = require("fs");
var port = 8080;
var interval = 1000;

http.createServer((req, res) => {
    if (req.url == "/events") {
        sendEvent(res);
    } else {
        fs.readFile("sse-client.html", (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        })
    }
}).listen(port);

function sendEvent(res) {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    setInterval(() => {
        const id = Date.now();
        const data = Math.random();
        const message = `id:${id}\ndata: ${data}\n\n`;
        res.write(message);
      }, interval);
}