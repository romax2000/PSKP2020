const express = require('express');
const cookies = require('cookie-parser');

let Users = require(__dirname+'/users.json');
const PORT = 3000;

app = express();
app.use(cookies());
app.use(express.urlencoded({exteded: true}));


app.get('/login', (req, res, next)=>{
  console.log('Login')
  res.sendFile(__dirname + '/form.html');
});

app.post('/login', (req, res, next)=>{
  console.log('params: ', req.body);

  let pass = Credential(req.body.user);
  if(verificate(pass, req.body.password)){//проверяем логин и пароль
    res.cookie('token', 'xxx-yyy-zzz').redirect('/resource'); //генерируем токен
  }
  else
    res.redirect('/login');
});

app.get('/resource', (req, res)=>{
  let cookie = req.cookies;
  console.log(cookie.token);

  if(cookie.token == 'xxx-yyy-zzz')//валидность токена
    res.end('Resource');
  else
    res.redirect('/login');
});

app.get('/logout', (req, res)=>{
  console.log('Logout');
  res.clearCookie('token');

  res.redirect('/login');
});

let Credential = (user) =>{
  let us = Users.find(u => u.user == user);
  if(us)
    return us.password;
  else
    return null;
};
let verificate = (pass1, pass2) =>{
  return pass1 == pass2;
};

app.listen(PORT, () =>
{
  console.log(`Listening on http://localhost:${PORT}`);
})
.on('error', (e) => {console.log(`Listener | error: ${e.code}`)});
