const JsonRPCServer = require('jsonrpc-server-http-nats');

const server = new JsonRPCServer();

let bin_validator = (param) => {
	console.log('validator bin', param);
	if(!Array.isArray(param))		throw new Error('Ожидается массив параметров');
	if(param.length != 2)			throw new Error('Ожидается 2 значения');
	if(!isFinite(param[0]) || !isFinite(param[1])) throw new Error('Ожидается число');
	if(param[1] == 0) throw new Error('Нельзя делить на 0');
	return param;
}

let mul_validator = (param) => {
	console.log('validator mul', param);
	if(!Array.isArray(param))		throw new Error('Ожидается массив параметров');
	if(param.length < 2)			throw new Error('Ожидается 2 или более значений');
	param.forEach(item => {
		if(!isFinite(item))			throw new Error('Ожидается число');
	})
	return param;
}

server.on('sum', mul_validator, (params, chanell, response) => {
	let sum = 0;
	params.forEach(param => sum += param);
	return response(null, sum)
})
server.on('mul', mul_validator, (params, chanell, response) => {
	let mul = 1;
	params.forEach(param => mul *= param);
	return response(null, mul)
})
server.on('div', bin_validator, (params, chanell, response) => {response(null, params[0]/params[1])})
server.on('proc', bin_validator, (params, chanell, response) => {response(null, 100 * params[0]/params[1])})


server.listenHttp({host: '127.0.0.1', port: 3000}, () => {console.log('Server start');})
