var qr = require("qr-image");
var fs = require("fs");
// var qrimg = qr.image("123", { type: "PNG", size: 20 });
// qrimg.pipe(fs.createWriteStream("123.PNG"));
var encodeString = process.argv[2];
var outputImage = process.argv[3];
qr.image(encodeString, { type: "PNG", size: 20 })
  .pipe(fs.createWriteStream(outputImage));
