const http = require('http');
const fs = require('fs');

const file = fs.createWriteStream('DownloadFile.txt');

let options = {
    host: 'localhost',
    path: '/',
    port: 3000,
    method: 'GET',
};

const req = http.request(options, (res) => {
    res.pipe(file); //Pipe - это канал, который связывает поток для чтения и поток для записи и позволяет сразу считать из потока чтения в поток записи. Для чего они нужны? Возьмем, к примеру проблему 
                    //копирования данных из одного файла в другой.
});

req.on('error', (err) => {
    console.log('http.request: error: ', err.message);
});

req.end();