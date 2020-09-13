let http = require('http');
let url = require('url');

let http404 = (req, res) => {
    console.log(`${req.method}:${req.url}, http status 404`);
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`error:${req.method}:${req.url} ,http status 404"}`);
};

let debug_handler = (req, res) => {
    console.log(req.method, req.url);
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`${req.method}:${req.url}`);
}

let GET_handler = (req, res) => {
    switch (req.url) {
        case '/':
            debug_handler(req, res);
            break;
        case '/home':
            debug_handler(req, res);
            break;
        default:
            http404(req, res);
            break;
    }
};

let POST_handler = (req, res) => {
    debug_handler(req, res)
};
let PUT_handler = (req, res) => {
    debug_handler(req, res)
};
let DELETE_handler = (req, res) => {
    debug_handler(req, res)
};


let http_handler = (req, res) => {
    switch (req.method) {
        case 'GET':
            GET_handler(req, res);
            break;
        case 'POST':
            POST_handler(req, res);
            break;
        case 'PUT':
            PUT_handler(req, res);
            break;
        case 'DELETE':
            DELETE_handler(req, res);
            break;
        default:
            http404(req, res);
            break;
    }
};

let server = http.createServer();
server.listen(3000, (v) => {
    console.log('server.listen(3000)')
})
    .on('error', (e) => {
        console.log('server.listen(3000):error', e.code)
    })
    .on('request', http_handler);
