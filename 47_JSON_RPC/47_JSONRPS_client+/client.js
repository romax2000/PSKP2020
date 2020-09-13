const JsonRPCClient = require('jsonrpc-client-http-nats');

let httpClient = JsonRPCClient.http('http://localhost:3000');
httpClient.request('sum', [42, 23], (err, result) => {
    if (err) {
        console.log(err)
    } else
        console.log(result);
})