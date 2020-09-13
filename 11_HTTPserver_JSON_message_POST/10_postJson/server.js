var http = require('http');

// без postman 
// let params = JSON.stringify({
//     txt: "HELLO"
// });

// let options = {
//     host: 'localhost',
//     path: '/json',
//     port: 3000,
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Content-Length': params.length
//     }
// }
// const req = http.request(options, (res) => {
//     console.log('method: ', req.method);
//     console.log('response: ', res.statusCode);
//     console.log('statusMessage: ', res.statusMessage);
//     let data = '';
//     res.on('data', (chunk) => {
//         console.log('data: body: ', data += chunk.toString('utf-8'));
//     });
// });

// req.on('error', (e) => { console.log('error: ', e.message); });
// req.write(params);
// req.end();


let server = http.createServer(function (req, res) {
    if (req.url === '/json' && req.method == 'POST') {
        let body = '';
        let bodyJSON;
        req.on('data', data => {
            body += data.toString();
        });
        req.on('end', () => {
            console.log(body);
            bodyJSON = JSON.parse(body);
            let { txt: txt } = bodyJSON;
            res.writeHead(200, { 'Content-type': 'application/json; charset=utf-8' });
            res.write(JSON.stringify({
                text: txt
            }));
            res.end();
        });
    }
});
server.listen(3000, (v) => { console.log("http://localhost:3000") });