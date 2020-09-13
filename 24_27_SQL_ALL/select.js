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

let selectAud = (mincap, maxcap, cb) => {
    const ps = new sql.PreparedStatement();
    ps.input('mincap', sql.Int);
    ps.input('maxcap', sql.Int);
    ps.prepare('select * from AUDITORIUM where AUDITORIUM_CAPACITY between @mincap and @maxcap;', err => {
        if (err) {
            console.log(err.message);
            cb(err, null);
        }
        else {
            ps.stream = true;
            let request = ps.execute({ mincap: mincap, maxcap: maxcap }, () => { });
            request.on('row', row => {
                // let str = '----';
                // for (key in row) {
                //     str += `${key}=${row[key]}`;
                // }
                // console.log(str);
                console.log(row);
            })
            request.on('error', err => { console.log(err); })
            request.on('done', result => {
                console.log('кол-во: ', result.rowsAffected[0]);
            })
        }
    })
}

sql.connect(config, err => {
    if (err) console.log('error con to bd', err.code);
    else {
        console.log('con with bd good');
        selectAud(40, 70, () => process.exit(0));
    }
})