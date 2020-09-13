const express = require('express');
const app = express();
const fs = require('fs');

app.use('', express.static('public'));

app.use((req, res, next) => {console.log('handler 02'); next();});

let wasmCode = fs.readFileSync('public/p.wasm');
console.log(wasmCode);
let wasmImports = {};
let wasmModule = new WebAssembly.Module(wasmCode);
let wasmInstance = new WebAssembly.Instance(wasmModule, wasmImports);

app.get('/', (req, res, next) => {
	res.type('html').send(
			`sum(8, 8) = ${wasmInstance.exports.sum(8,8)} <br/>` +
			`sub(8, 8) = ${wasmInstance.exports.sub(8,8)} <br/>` +
			`mul(8, 8) = ${wasmInstance.exports.mul(8,8)} <br/>`			
		);
})

app.listen(3000, () => { console.log('Start server, port: ', 3000);})
