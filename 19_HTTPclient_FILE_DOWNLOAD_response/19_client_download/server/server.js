const http = require('http');
const fs = require('fs');

let file = fs.readFileSync('MyFile.txt');

http.createServer(function (req, res) {
    req.on('data', (chunk) => { //2
        res.write(chunk.toString('utf-8'));
    });
    req.on('end', () => { //1 
        res.end(file);
    });
}).listen(3000);

console.log('Server running on http://localhost:3000/');