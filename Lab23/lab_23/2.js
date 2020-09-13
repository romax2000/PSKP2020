/**
 * Promise based HTTP client for the browser and node.js
 **/
const axios = require('axios');

/**
 * The crypto module
 * provides cryptographic functionality
 * that includes a set of wrappers for
 * OpenSSL's hash, HMAC, cipher, decipher, sign, and verify functions.
 * */
const crypto = require('crypto');

/**
 * Get the MD5-sum of a given file,
 * with low memory usage, even on huge files.
 * */
const md5File = require('md5-file');

const fs = require('fs');
const path = require('path');

let clientKey;
let clientPublicKey;

let sessionSecret;

axios.get('http://localhost:3000/').then(({ data: { prime, publicKey } }) => {
  // создание приватного ключа на клиенте
  // с помощью уникального параметра сгенерированного сервером
  clientKey = crypto.createDiffieHellman(Buffer.from(JSON.parse(prime).data));
  // создание публичного ключа на клиенте
  clientPublicKey = clientKey.generateKeys('base64');

  // создание ключа сессии на клиенте
  // вызывом computeSecret
  // передаем иуда публ ключ сервера и кодир
  sessionSecret = clientKey.computeSecret(publicKey, 'base64');
  console.log('clientPublicKey');
  console.log(clientPublicKey);
  console.log('\n');

  axios
    .post('http://localhost:3000/session', { publicKey: clientPublicKey })
    .then(({ data }) => {
      console.log('sessionSecret');
      console.log(sessionSecret.toString());
      console.log('\n');

      axios
        .get('http://localhost:3000/resource')
        .then(async ({ data: { txt } }) => {
          // 1 -  создаем объект для шифрования/расшифр по aes256 и ключа сессии
          const decipher = crypto.createDecipher(
            'aes256',
            sessionSecret.toString()
          );
          const decryptedTxt =
            decipher.update(txt, 'hex', 'utf8') + decipher.final('utf8');
          console.log('DECRYPTED: ', decryptedTxt);
          console.log('\n');

          let pathToDecrypted = path.join(__dirname, 'decrypted.txt');
          await fs.promises.writeFile(pathToDecrypted, decryptedTxt);
        });
      axios
        .get('http://localhost:3000/verified-resource')
        .then(async ({ data: { txt, ver } }) => {
          let pathTofile = path.join(__dirname, 'file.txt');
          await fs.promises.writeFile(pathTofile, txt);
          // md5File.sync - считает хэш-сумму файла
          const fileHash = md5File.sync(pathTofile);
          const hash = (fileHash + sessionSecret.toString()).hashCode();
          // hash - хэш-сумма/цифр подпись подсчитанна клиентом
          // ver - хэш-сумма/цифр подпись подсчитанна сервером
          // смотрит, чтобы совпадала
          if (hash === ver) {
            console.log('ЦИФРОВАЯ ПОДПИСЬ ДЕЙСТВИТЕЛЬНА');
            console.log('Файл: ', txt);
            console.log('\n');
          } else {
            console.log('ЦИФРОВАЯ ПОДПИСЬ НЕДЕЙСТВИТЕЛЬНА');
            console.log('\n');
          }
        });
    });
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
