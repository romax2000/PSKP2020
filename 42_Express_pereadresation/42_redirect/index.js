const app = require('express')();

app.get('/', (req, res) => {
  res.redirect('/redirect');
});
app.get('/redirect', (req, res) => {
  res.status(308).send('redirect successful!');
  //Код ответа на статус перенаправления "HTTP 308 Permanent Redirect" указывает, 
  //что запрошенный ресурс был окончательно перемещен в URL-адрес, указанный в Location. 
  //Браузер перенаправляется на эту страницу, а поисковые системы обновляют свои ссылки на ресурс
});

app.listen(3000, () => {
  console.log(`Listening on http://localhost:3000`);
})
  .on('error', (e) => { console.log(`Listener | error: ${e.code}`) });

