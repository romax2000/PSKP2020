var http = require('http');
const Json = require('./json_module');
const crJs = require('./createJson_module');

let server = http.createServer(function (req, res) {
    if (req.url === '/json' && req.method === 'POST') {
        let result = '';
        req.on('data', (data) => {
            result += data;
        });
        console.log(result);
        req.on('end', () => {
            try {
                let obj = JSON.parse(result);
                console.log(obj);
                if (Json.isJsonContentType(req.headers)) {
                    Json.write200(res, 'json ok', crJs.createResp(obj));
                } else {
                    Json.write400(res, 'no accept');
                }
            } catch (e) {
                Json.write400(res, 'catch: bad json');
            }
        });
    }
});

server.listen(5000, () => {
    console.log("server run http://localhost:5000/")
});


