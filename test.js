/* eslint-disable camelcase */
const crypto = require("crypto");

const encrypt = function (plain_text, encryptionMethod, secret, iv) {
  const encryptor = crypto.createCipheriv(encryptionMethod, secret, iv);
  return encryptor.update(plain_text, "utf8", "base64") + encryptor.final("base64");
};

const decrypt = function (encryptedMessage, encryptionMethod, secret, iv) {
  const decryptor = crypto.createDecipheriv(encryptionMethod, secret, iv);
  return decryptor.update(encryptedMessage, "base64", "utf8") + decryptor.final("utf8");
};

const textToEncrypt = "Nishit Jariwala";
const encryptionMethod = "AES-256-CBC";
const secret = "My32charPasswordAndInitVectorStr"; // must be 32 char length
const iv = secret.substr(0, 16);

const encryptedMessage = encrypt(textToEncrypt, encryptionMethod, secret, iv);
const decryptedMessage = decrypt(encryptedMessage, encryptionMethod, secret, iv);

console.log(encryptedMessage);
console.log(decryptedMessage);
