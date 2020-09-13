var http = require('http');
const { Console } = require('console');

let server = http.createServer(function (req, res) {
    if (req.method === 'POST') {
        let result = '';
        req.on('data', (data) => {
            result += data;
            console.log(result);
        });
        // req.on('end', () => {
        //     res.writeHead(200, { 'Content-type': 'application/json; charset=utf-8' });
        //     res.end(result);
        // });
    }
});

server.listen(3000, () => {
    console.log("server run http://localhost:3000/")
});


