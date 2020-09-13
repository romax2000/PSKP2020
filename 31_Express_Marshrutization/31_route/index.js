const express = require("express");
const app = express();
app.get('/', function (req, res, next) {
    console.log('GET /');
    res.send('<h1>GET</h1>');
})
app.post('/', function (req, res, next) {
    console.log('POST /');
    res.send('<h1>POST</h1>');
})
app.put('/', function (req, res, next) {
    console.log('PUT /');
    res.send('<h1>PUT</h1>');
})
app.delete('/', function (req, res, next) {
    console.log('DELETE /');
    res.send('<h1>DELETE</h1>');
})
app.listen(3000);
console.log('listen http://localhost:3000/');
