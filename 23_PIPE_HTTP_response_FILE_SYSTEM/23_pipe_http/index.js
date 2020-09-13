const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        fs.createReadStream('file.txt').pipe(res);
    }
}).listen(3000);