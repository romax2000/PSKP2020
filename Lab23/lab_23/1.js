const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const md5File = require('md5-file');
const path = require('path');

const app = express();

app.use(bodyParser.json());

let server = crypto.createDiffieHellman(1024);
let prime = server.getPrime(); //Возвращает простое число Диффи-Хеллмана

let serverKey;
let serverPublicKey;

let sessionKey;

app.get('/', (req, res) => {
  // создание приватного ключа сервера
  serverKey = crypto.createDiffieHellman(prime);

  // создание публичного ключа сервера
  serverPublicKey = serverKey.generateKeys('base64');
  console.log('serverPublicKey');
  console.log(serverPublicKey.toString());
  console.log('\n');

  res.json({ prime: JSON.stringify(prime), publicKey: serverPublicKey });
});

app.post('/session', (req, res) => {
  const { publicKey } = req.body;
  if (!publicKey) {
    res.status(409).json({ message: 'Exchange secrets first' });
  } else {
    // создание ключа сессии на сервере
    // вызывом computeSecret у объекта приватного ключа сервера
    // передаем туда публ ключ клиента и кодир
    sessionKey = serverKey.computeSecret(publicKey, 'base64');
    console.log('sessionKey');
    console.log(sessionKey.toString());
    console.log('\n');
    res.json({ message: 'ok' });
  }
});

app.get('/resource', (req, res) => {
  if (!sessionKey) {
    res.status(409).json({ message: 'Exchange secrets first' });
  } else {
    const txt = 'Zavadski Roman FIT 3-4';
    // шифрует исходный текст
    // 1 -  создаем объект для шифрования по aes256 и ключа сессии
    // 2 - шифруем
    const cipher = crypto.createCipher('aes256', sessionKey.toString());
    const encrypted = cipher.update(txt, 'utf8', 'hex') + cipher.final('hex');

    res.json({ txt: encrypted });
  }
});

app.get('/verified-resource', (req, res) => {
  if (!sessionKey) {
    res.status(409).json({ message: 'Exchange secrets first' });
  } else {
    // созд путь для чтения файла
    let pathTofile = path.join(__dirname, 'file.txt');
    // md5File.sync - считает хэш-сумму файла
    const hash = md5File.sync(pathTofile);
    const txt = 'Zavadski Roman FIT 3-4';
    res.json({ txt, ver: (hash + sessionKey.toString()).hashCode() });
  }
});

app.listen(3000, () => {
  console.log('Server started: http://localhost:3000');
  console.log('\n');
});

String.prototype.hashCode = function () {
  let hash = 0;
  if (this.length === 0) {
    return hash;
  }
  for (let i = 0; i < this.length; i++) {
    const char = this.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};
