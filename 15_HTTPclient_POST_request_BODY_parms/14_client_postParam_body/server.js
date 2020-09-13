let http = require('http');
let qs = require('querystring');

let handler = (req, res) => {
    if (req.method === 'POST') {
        let result = '';
        req.on('data', (data) => {
            result += data;
        });
        req.on('end', () => {
            let o = qs.parse(result);
            for (let key in o) {
                result += `${key} = ${o[key]}`;
                console.log(`${key} = ${o[key]}`);
            }
            res.end(result);
        });
    }
};

let server = http.createServer();
server.listen(3000, () => {
    console.log('SERVER.LISTEN(3000)')
}).on('request', handler);