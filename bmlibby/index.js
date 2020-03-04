// let help = require("./helper/help");
// exports.hello = user => {
//   return "Hello Mrs." + user + "! " + help.ending();
// };

let bcrypt = require("bcrypt");
let encode = plainPass => {
  //return "Ecoding Password";
  return new Promise((res, rej) => {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(plainPass, salt, function(err, hash) {
        if (err) rej(err);
        res(hash);
      });
    });
  });
};
let compare = (plainPass, hashPass) => {
  //return "Compare";
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainPass, hashPass, (err, bool) => {
      if (err) reject(err);
      resolve(bool);
    });
  });
};
module.exports = {
  encode,
  compare
};
