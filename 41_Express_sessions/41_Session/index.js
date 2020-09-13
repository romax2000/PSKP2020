const app = require('express')();
const session = require('express-session')({
    secret: 'mysecret',
    saveUninitialized: true,
    resave: false
    // resave - нужно ли пересохранять сессию в хранилище, если она не изменилась.
    //saveUninitialized: если true, то в хранилище будут попадать пустые сессии.
});
app.use(session);
app.get('/', (req, res) => {
    if (!isFinite(req.session.exam)) { //если не заданно значение (является ли оно конечным числом)
        req.session.exam = 0;
    }
    else {
        req.session.exam++;
    }
    res.send('Session:' + req.session.exam);
});

app.listen(3000, () => {
    console.log(`Listening on http://localhost:3000`);
})
