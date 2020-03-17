 
let libby = require("./bmlibby/index");

// console.log(libby.hello("Thazin"));

// console.log(libby.encode("123"));
// console.log(libby.compare("123", "dfghj45678ertyu345678dfgh456"));

libby
  .encode("123")
  //   .then(result => console.log(result))
  .then(hash => libby.compare("123", hash))
  .then(result => console.log(result))
  .catch(error => console.log(error));