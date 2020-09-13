const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:4000/');

ws.on('open', () => {
    ws.on('message', (data) => {
        console.log('on message: ', JSON.parse(data));
    });
    ws.send(JSON.stringify({message: 'hello from client'}));

});

