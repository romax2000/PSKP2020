const express = require("express");
const app = express();
app.use("/", function (req, res) {
    let x = req.query.x;
    let y = req.query.y;
    if (x == undefined || y == undefined) {
        res.send("<h2>QUERY</h2>");
    }
    else {
        res.send(`<h2>QUERY:<br>X = ${x} <br> Y = ${y}</h2>`);
    }
});
app.listen(3000);
console.log('listen http://localhost:3000/?x=1&&y=asd');