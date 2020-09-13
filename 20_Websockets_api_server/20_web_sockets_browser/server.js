const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');

http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/start') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(fs.readFileSync('./client.html'));
    } else {
        res.statusCode = 400;
        res.end('<h1>ERROR: 400</h1>');
    }
}).listen(3000);
console.log('Server running at http://localhost:3000/start');


const ws = new WebSocket.Server({ port: 4000, host: 'localhost', path: '/' });
ws.on('connection', (wss) => {
    wss.on('message', message => {
        console.log(`Received message => ${message}`);
    })
    wss.send(`Hello from server`);
})
ws.on('error', (e) => {
    console.log('ws server error', e)
});

console.log(`ws server: host:${ws.options.host}, port:${ws.options.port}, path:${ws.options.path}`);
