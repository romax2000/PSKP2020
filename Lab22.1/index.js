const app = require('express')();
const https = require('https');
const fs = require('fs');

const PORT = 3000;

let options = {
    key: fs.readFileSync(`${__dirname}/my/romax.key`).toString(),
    cert: fs.readFileSync(`${__dirname}/my/romax.crt`).toString()
};


app.get('/', (req, res) => {
    console.log('Welcome!');
    res.send('Welcome!');
});

https.createServer(options, app).listen(PORT, () =>{
  console.log(`Listening on https://localhost:${PORT}`);
})
.on('error', (e) => {console.log(`Listener | error: ${e.code}`)});
