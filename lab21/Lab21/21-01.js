const app = require('express')();
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const session = require('express-session')({
  resave: false, //сохранять при отсутствии изменений
  saveUninitialized: false,
  secret: '228' //при шифровании
});

let Users = require(__dirname+'/users.json');
const PORT = 3000;
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

passport.use(new BasicStrategy((user, pass, done)=>{
  let rc = null;
  let cr = Credential(user);
  if(!cr){
    console.log('Enter right login!');
    rc = done(null, false, {message: 'Enter right login!'});
  }
  else if(!verificate(cr.password, pass)){
    console.log('Enter right password!');
    rc = done(null, false, {message: 'Enter right password!'});
  }
  else {
    rc = done(null, user, {message: 'Well done!'});
  }
  return rc;
}));

passport.serializeUser((user, done)=>{ //сохранить пользовательские данные сессии
  console.log('SerializeUser');
  done(null, user);
});
passport.deserializeUser((user, done)=>{ //достать их
  console.log('DeserializeUser');
  done(null, user);
});

app.get('/login', (req, res, next)=>{
  console.log('Login')

  if(req.session.logout && req.headers['authorization']){
    req.session.logout = false;

    delete req.headers['authorization'];
  }

  next();
}, passport.authenticate('basic'), (req, res, next)=>{ //Здесь мы проверяем, передаем данные о пользователе в функцию верификации
  if(req.session.logout == undefined)
    req.session.logout = false;
  next();
})

.get('/login', (req, res, next)=>{
  res.end('Welcome!');
})

app.get('/logout', (req, res)=>{
  console.log('Logout');
  req.session.logout = true;
  delete req.headers['authorization'];
  res.redirect('/login');
})

app.get('/resource', (req, res)=>{
  console.log('Resource');

  if(req.session.logout == false && req.headers['authorization'])
    res.end('Resource');
  else
    res.redirect('/login')
});

let Credential = (user) =>{
  let us = Users.find(u => u.user.toLowerCase() == user.toLowerCase());
  return us;
};
let verificate = (pass1, pass2) =>{
  return pass1 == pass2;
};

app.listen(PORT, () =>
{
  console.log(`Listening on http://localhost:${PORT}`);
})
.on('error', (e) => {console.log(`Listener | error: ${e.code}`)});
