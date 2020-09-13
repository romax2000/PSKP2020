let fs = require('fs');
let http = require('http');

http.createServer(function (req, res) {
    const picPath = 'pic.png';
    if (req.url === "/png") {
        fs.stat(picPath, (err, stat) => { // Если мы заведомо знаем, что файл может не существовать, то мы можем проверить его при помощи специального вызова.
            if (err) { console.log('error:' + err.message); }
            else {
                png = fs.readFile(picPath, (err, data) => {
                    res.contentType = 'image/png';
                    res.contentLength = stat.size;
                    res.end(data);
                });
            }
        })
    }
    if (req.url === '/html') {
        let html = fs.readFileSync('index.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(html);
    }
    if (req.url === '/css') {
        let css = fs.readFileSync('style.css');
        res.writeHead(200, { 'Content-type': 'text/css; charset=utf-8' });
        res.end(css);
    }
    if (req.url === '/js') {
        let js = fs.readFileSync('js.js');
        res.writeHead(200, { 'Content-type': 'text/javascript; charset=utf-8' });
        res.end(js);
    }
    if (req.url === '/word') {
        let word = fs.readFileSync('word.docx');
        res.writeHead(200, { 'Content-type': 'application/msword; charset=utf-8' });
        res.end(word);
    }

}).listen(3000);
console.log("Server running at http://localhost:3000");




