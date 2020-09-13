const http = require('http');

http.createServer(function (req, res) {
    req.on('data', (chunk) => {
        // res.write(chunk.toString('utf-8'));
        console.log(chunk.toString('utf-8'));
    });
}).listen(3000);

console.log('Server running on http://localhost:3000/');