let http = require('http');
let url = require('url');
const fs = require('fs');

let server = http.createServer(function (request, response) {
    const picPath = '11.png';
    if (request.url === "/png") {
        fs.stat(picPath, (err, stat) => { //вызов если файла может не существовать
            if (err) {
                console.log('error:' + err.message);
            } else {
                png = fs.readFile(picPath, (err, data) => {
                    response.contentType = 'image/png';
                    response.contentLength = stat.size;
                    response.end(data);
                });
            }
        })
    }
});

server.listen(3000, () => {
    console.log("http://localhost:3000/png")
});