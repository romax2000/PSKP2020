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


let insertAud = (a, an, ac, at, cb) => {
    const ps = new sql.PreparedStatement();
    ps.input('a', sql.NChar(10));
    ps.input('an', sql.NVarChar(20));
    ps.input('ac', sql.Int);
    ps.input('at', sql.NChar(10));
    ps.prepare('insert AUDITORIUM(AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_CAPACITY, AUDITORIUM_TYPE)'
        + 'values(@a,@an,@ac,@at)', err => {
            if (err) cb(err, null);
            else {
                ps.stream = true;
                let request = ps.execute({ a: a, an: an, ac: ac, at: at }, () => {
                });
                request.on('done', result => {
                    console.log('kol-vo: ', result.rowsAffected[0]);
                })
            }
        })
};

sql.connect(config, err => {
    if (err) console.log('error con to bd', err.code);
    else {
        console.log('con with bd good');
        insertAud('330-1', '330-1', 30, 'ЛК', () => process.exit(0));
    }
})