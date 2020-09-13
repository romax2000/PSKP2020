const child = require('child_process');
const fp = child.fork('fork.js'); //создаем новый процесс, который будет работать с файлом fork.js

const send = () => {
    fp.send('HI'); //отправляем на дочерний процесс
};
setInterval(send, 2000);