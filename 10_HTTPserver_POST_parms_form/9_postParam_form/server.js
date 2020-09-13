let http = require('http');
let fs = require('fs');
let qs = require('querystring');

let handler = (req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' });
        res.end(fs.readFileSync('index.html'));
    } else if (req.method === 'POST') {
        let result = '';
        req.on('data', (data) => {
            result += data;
        });
        req.on('end', () => {
            result += '<br/>';
            let o = qs.parse(result);
            for (let key in o) {
                result += `${key} = ${o[key]}<br/>`
            }
            console.log(result);
            res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' });
            res.write('<h1>URL-параметры</h1>');
            res.end(result);
        });
    }
};

let server = http.createServer();
server.listen(3000, () => {
    console.log("server run http://localhost:3000/")
}).on('request', handler);