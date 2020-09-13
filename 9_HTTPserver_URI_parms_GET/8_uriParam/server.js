let http = require('http');
let url = require('url');

let handler = (req, res) => {
    if (req.method === 'GET') {
        let p = url.parse(req.url, true);
        let result = '';
        result = `pathname: ${p.pathname}<br/>`;
        p.pathname.split('/').forEach(e => { //после куаждого / на новую строку
            result += `${e}<br/>`
        });

        res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' });
        res.write('<h1>URI-PARAM</h1>');
        res.end(result);
    }
};

let server = http.createServer();
server.listen(3000, () => {
    console.log("SERVER LISTEN(3000)")
}).on('request', handler);