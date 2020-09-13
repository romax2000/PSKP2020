const app = require('express')();
const cookieparser = require('cookie-parser')('mysecret');
app.use(cookieparser);

app.get('/cookie', (req, res) => {
    res.cookie('id', '1').cookie('name', 'exam', { signed: true });
    res.send(`Cookie add!`);
});
app.get('/cookie-view', (req, res) => {
    let { id } = req.cookies;
    let { name } = req.signedCookies;
    res.send(`Id = ${id}<br> Name = ${name}`);
});

app.get('/cookie-delete', (req, res) => {
    res.clearCookie('id').clearCookie('name');
    res.send(`Cookie clear!`);
});

app.listen(3000, () => {
    console.log(`Listening on http://localhost:3000`);
})
    .on('error', (e) => { console.log(`Listener | error: ${e.code}`) });

