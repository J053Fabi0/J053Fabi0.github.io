const bcrypt = require("bcrypt");
const SALT_FACTOR = 10;

module.exports = (pswrd) =>
  new Promise((res, rej) =>
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
      if (err) rej(err);
      bcrypt.hash(pswrd, salt, function (err, hash) {
        if (err) rej(err);
        res(hash);
      });
    })
  );
