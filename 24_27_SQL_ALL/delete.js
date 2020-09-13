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


let deleteAud = (a, cb) => {
    const ps = new sql.PreparedStatement();
    ps.input('a', sql.NChar(10));
    ps.prepare('delete FROM AUDITORIUM where AUDITORIUM = @a', err => {
        if (err) {
            console.log(err.message);
            cb(err, null);
        }
        else {
            ps.stream = true;
            let request = ps.execute({ a: a }, () => { });
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
        deleteAud('330-1', () => process.exit(0));
    }
})