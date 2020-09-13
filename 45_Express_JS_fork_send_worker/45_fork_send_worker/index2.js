 const { Worker, isMainThread } = require('worker_threads');
//
//node --experimental-worker index2
if (isMainThread) {
    let w1 = new Worker(__filename); //созадем новый процесс Worker (указываем __filename (файл, который открыт)), который вызывает сам себя
    //путь к файлу с кодом воркера
    setInterval(() => {
        console.log('main');
    }, 2000);
}
else {
    setInterval(() => {
        console.log('nomain');
    }, 3000);
}