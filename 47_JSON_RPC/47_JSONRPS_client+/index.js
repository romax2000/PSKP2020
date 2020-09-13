const JsonRPCServer = require('jsonrpc-server-http-nats');
const server = new JsonRPCServer();
const config = {
    host: 'localhost',
    port: 3000
};
/*
{
    "jsonrpc": "2.0",
    "method": "sum",
    "params": [42, 23],
    "id": 1
}
*/
let JsonRPCValidMulti = (param, response) => {
    // провека на ввод нескольких значений сразу (в данном случае явл ли параметр массивом)
    if (!Array.isArray(param)) {
        throw new Error(`It's not Array:` + param);
    }
    return param;
};
server.on('sum', JsonRPCValidMulti, (params, channel, response) => {
    console.log(params);
    //применяет функцию reducer к каждому элементу массива (слева-направо), возвращая одно результирующее значение
    response(null, params.reduce((a, b) => a + b));
});

server.listenHttp({ host: config.host, port: config.port }, () => {
    console.log(`Listening to http://${config.host}:${config.port}`);
});