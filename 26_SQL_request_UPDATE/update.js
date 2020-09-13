const sql = require('mssql');
var config = {
    user: 'Nikita',
    password: '1234',
    server: 'localhost',
    database: 'lab14',
    options: {
        enableArithAbort: true
    }
};

let deleteAud = (aBefore, aAfter, cb) => {
    const ps = new sql.PreparedStatement(); //для выполнения запросов
    ps.input('aAfter', sql.NChar(10)); //добавляем параметр (1 параметр - имя, 2 - тип);
    ps.input('aBefore', sql.NVarChar(20));
    ps.prepare('update AUDITORIUM set AUDITORIUM= @aAfter where AUDITORIUM = @aBefore', err => { //формируем запрос
        if (err) {
            console.log(err.message);
            cb(err, null);
        }
        else {
            ps.stream = true; // включаем потоковую передачу для каждого запроса независимо. Всегда устанавливайте значение true, если вы планируете работать с большим количеством строк.
            let request = ps.execute({ aAfter: aAfter, aBefore: aBefore }, () => { });
            request.on('done', result => { //Отправляется после завершения запроса.
                console.log('kol-vo: ', result.rowsAffected[0]); // кол-во измененных/добавленных/удаленных/просмотренных строк
            })
        }
    })
};

sql.connect(config, err => {
    if (err) console.log('error con to bd', err.code);
    else {
        console.log('con with bd good');
        deleteAud('115-4', '114-4', () => process.exit(0));
    }
})