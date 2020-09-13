const rpcWSS = require('rpc-websockets').Server;

let server = new rpcWSS({ port: 4000, host: 'localhost' });

//регистрируем метод
server.register('sum', (params) => {
    return Number.parseInt(params[0]) + Number.parseInt(params[1])
}).public(); //могут быть protected(защищённые)

server.register('get', (params) => {
    return { id: params[0], date: new Date().toISOString() }
}).public();
