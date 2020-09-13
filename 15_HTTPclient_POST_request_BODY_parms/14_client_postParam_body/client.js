let http = require('http');
let query = require('querystring');

let params = query.stringify({x: 3, y: 4, s: 'xxx'});


console.log('params', params);

let options = {
    host: 'localhost',
    path: '/mypath',
    port: 3000,
    method: 'POST'
};

const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        console.log('http.request:data: body = ', data += chunk.toString('utf8'));
    });
    res.on('end', () => {
        console.log('http.request : body: end:', data);
    });
});
req.write(params);
req.end();