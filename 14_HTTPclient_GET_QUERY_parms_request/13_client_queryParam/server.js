let http = require('http');
let url = require('url');

let handler = (req, res) => {
    if (req.method === "GET") {
        let result = '';
        let q = url.parse(req.url, true).query;

        for (key in q) {
            result += `${key} = ${q[key]};`;
            console.log(`${key} = ${q[key]}`);
        }

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

        res.end(result);
    }
};

let server = http.createServer();
server.listen(3000, (v) => {
    console.log('SERVER.LISTEN(3000)')
}).on('request', handler);