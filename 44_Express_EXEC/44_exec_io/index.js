//Функция exec() создает новую оболочку и выполняет заданную команду. 
//Выходные данные выполнения буферизуются, что означает, что они хранятся в памяти и доступны для использования в обратном вызове.

const exec = require('child_process').execFile; // создает процесс который выполняет файл по указанному тобой пути
const dir = exec('exec',
    { cwd: 'D:\\Dokuments\\NODEJS\\LABS\\labs2sem\\Экзамен2020\\44_Express_EXEC\\44_exec_io\\exec\\exec\\bin\\Debug' },
    (err, stdout, stderr) => {
        if (stderr) {
            console.log(`stderr: ${stderr}`);
        }
        else {
            console.log(`stdout: ${stdout}`);
        }
    });
dir.stdin.write('exam');
dir.stdin.end(); 