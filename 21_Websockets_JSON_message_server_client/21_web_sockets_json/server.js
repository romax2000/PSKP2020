const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 4000, host: 'localhost' });

wss.on('connection', (ws) => {
    ws.on('message', (data) => {
        let pdata = JSON.parse(data);
        console.log('on message: ', pdata);
        ws.send(JSON.stringify({ message: 'hello from server' }));
    });
});

wss.on('error', (e) => { console.log('wss server error ', e); });