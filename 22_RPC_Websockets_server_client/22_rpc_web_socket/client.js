const rpcWSC = WebSocket = require('rpc-websockets').Client;
let ws = new rpcWSC('ws://localhost:4000');

ws.on('open', () => {
    ws.call('sum', [process.argv[2], process.argv[3]]).then((r) => {
        console.log('sum = ', r);
    });
    ws.call('get', [process.argv[2]]).catch((e) => {
        return e;
    }).then((r) => {
        console.log('get = ', r);
    });
});

ws.on('error', (e) => {
    console.log('error = ', e);
});
