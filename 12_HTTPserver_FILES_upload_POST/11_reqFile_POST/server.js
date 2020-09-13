const fs = require('fs');
const http = require('http');

let handler = (req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' });
        res.end(fs.readFileSync('index.html'));
    } else if (req.method === 'POST') {
        let body = '';
        req.on('data', data => {
            body += data;
        });
        req.on('end', () => {
            res.writeHead(200, { 'Content-type': 'text/plain; charset=utf-8' });
            console.log(body);
            res.end(body);
        });
    }
};

let server = http.createServer();
server.listen(3000, () => {
    console.log("http://localhost:3000/")
}).on('request', handler);