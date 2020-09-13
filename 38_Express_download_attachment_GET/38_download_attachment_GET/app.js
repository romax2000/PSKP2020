const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();


app.get("/download", function(req, res){
  const file = `${__dirname}/upload/vidra.png`;
  res.download(file); // Set disposition and send it.
});


app.get("/attachment", function(req, res){
  res.attachment("vidra.png");
  let rs = fs.ReadStream("./upload/vidra.png");
  rs.pipe(res);
})

app.listen(3000);
