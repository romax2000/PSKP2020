let http = require("http");
let url = require("url");

let handler = (req, res) => {
  if (req.method === "GET") {
    let result = "";
    let quary = url.parse(req.url, true).query;
    for (key in quary) {
      result += `${key} = ${quary[key]}<br/>`;
    }
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<h1>PARAMS</h1>");
    console.log("result: ", result);
    res.end(result);
  }
};

let server = http.createServer();
server.listen(3000, () => {
  console.log("SERVER.LISTEN(3000)");
})
  .on("request", handler);
