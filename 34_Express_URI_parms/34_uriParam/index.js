const express = require("express");
const app = express();
app.use("/:parm1/:parm2", function (req, res) {
    let parm1 = req.params.parm1;
    let parm2 = req.params.parm2;
    res.send(`<h2>URI PARAM:<br>PARM1 = ${parm1}<br>PARM2 = ${parm2}`);
});
app.listen(3000);
console.log('listen http://localhost:3000/a/b');