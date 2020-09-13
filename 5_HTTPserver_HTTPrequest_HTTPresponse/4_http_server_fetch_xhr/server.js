let http = require('http');
let url = require('url');
let fs = require('fs');
http.createServer((req,res)=>{
    if(url.parse(req.url).pathname === '/name'){
        res.contentType='text/plain';
        res.end('exam');
    }
    else if(url.parse(req.url).pathname === '/xmlhttprequest'){
        let file = fs.readFile('./xmlhttp.html',(err,data)=>{
            res.contentType='text/plain';
            res.end(data);
        })
    }
    else if (url.parse(req.url).pathname === '/fetch'){
        let file = fs.readFile('./fetch.html',(err,data)=>{
            res.contentType='text/plain';
            res.end(data);
        })
    }
}).listen(3000);
console.log('server is running');