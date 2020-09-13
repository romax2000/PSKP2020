const spawn = require('child_process').spawn;//позволяет нам вызвать программную оболочку shell
//child_process.spawn запускает новый процесс с помощью заданной команды. (дочерний процесс)
const dir = spawn('cmd.exe', ['/U', '/C', 'dir']); //создаем консоль с параметрами U-unicode С-ключ(нужно вызвать и завершить работу в консоли) dir - получить каталог папки
//Метод spawn() возвращает потоки (stdout & stderr), он должен использоваться,
//когда процесс возвращает большой объем данных. spawn() начинает принимать ответ, сразу после начала выполнения процесса.
const findstr = spawn('findstr', ['/c:ex']); //помагает отыскивать строки из главного потока, [шаблон] like(in);

dir.stdout.setEncoding('utf16le');
//Любой поток может использовать.pipe() для соединения входов с выходами.
//.pipe() это просто функция, которая берет поток на чтение  и соединяет его вывод с вводом потока на запись
dir.stdout.pipe(findstr.stdin); //из дочернего процесса передаем данные в главный(где запущена наша программа); 

dir.stdout.on('data', (data) => {
    console.log(`out: ${data.toString()}`);
});

findstr.stdout.on('data', (data) => {
    console.log(`find: ${data.toString()}`);
});

dir.stderr.on('data', (data) => {
    console.log(`error: ${data.toString()}`);
});

dir.on('close', (code) => {
    console.log(`close: ${code}`);
});