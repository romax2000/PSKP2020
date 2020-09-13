let http = require('http');
let fs = require('fs');

let body = fs.readFileSync('./MyFile.txt');

let options = {
    host: 'localhost',
    path: '/mypath',
    port: 3000,
    method: 'POST',
    headers: { 'content-type': 'multipart/form-data;' }
};

// const req = http.request(options, (res) => {
//     let data = '';
//     /*
//     on data => когда клиент только получает данные, мы их складываем в переменную, затем выводим. 
//     Т.к данные у нас отправляются кучками, а не единым целым, то эта функция по идее вызывается n-ое
//      кол-во раз (именно сложение в переменную, т.к. там промис)
//     */
//     res.on('data', (chunk) => {
//         console.log("http.request: data: body =", data += chunk.toString('utf8'));
//     });
//     /*
//     on end => когда уже заканчивается наш респонс, типа убивается, мы выводим полученную инфу из респонса. 
//     Т.е. уже сразу готовый текст, полученный после on data
//     */
//     res.on('end', () => {
//         console.log('http.request: end: body =', data);
//     });
// });
const req = http.request(options);
req.end(body);
