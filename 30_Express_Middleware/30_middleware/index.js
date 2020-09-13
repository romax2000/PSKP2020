const express = require("express");

const app = express();

app.use(function (req, res, next) {
    let now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let data = `Time:${hour}:${minutes}:${seconds}`;
    console.log(data);
    next();
});
app.use(function (req, res, next) {
    let data = `Method:${req.method}\n${req.url}`;
    console.log(data);
    next();
});
app.use('/', function (req, res, next) {
    res.send('Hello');
});
app.listen(3000);
console.log('listen http://localhost:3000/');

