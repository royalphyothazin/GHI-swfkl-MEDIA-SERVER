let http = require("http");
let url = require("url");
let qs = require("querystring");
let fs = require("fs");
let path = require("path");
require("dotenv").config();

let meme = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".PNG": "image/PNG",
  ".jpg": "image/jpeg",
  ".gif": "image/gif"
};

let checkFileExist = filePath => {
  return new Promise((resolve, reject) => {
    fs.access(filePath, fs.F_OK, err => {
      if (err) reject(err);
      resolve(filePath);
    });
  });
};

let readMyFile = filePath => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

let router = (req, res) => {
  let params = url.parse(req.url, true);
  let oriPath = params.pathname == "/" ? "/index.html" : params.pathname;
  let filePath = __dirname + oriPath;
  let ext = path.extname(oriPath);
  //console.log(filePath, ext);
  // fs.access(filePath, fs.F_OK, err => {
  //   if (err) {
  //     res.writeHead(404, { "Content-type": "text/html" });
  //     res.end("<h1>File Not Found</h1>");
  //   } else {
  //     fs.readFile(filePath, (err, data) => {
  //       if (err) {
  //         res.writeHead(403, { "Content-type": "text/html" });
  //         res.end("<h1>File Read Error</h1>");
  //       } else {
  //         res.writeHead(200, { "Content-type": meme[ext] });
  //         res.end(data);
  //       }
  //     });
  //   }
  // });

  // checkFileExist(filePath)
  //   .then(filePath => console.log(filePath))
  //   .catch(err => console.log(err));

  checkFileExist(filePath)
    .then(readMyFile)
    .then(data => {
      res.writeHead(200, { "Content-type": "text/html" });
      res.end(data);
    })
    .catch(err => {
      res.writeHead(400, { "Content-type": "text/html" });
      res.end("<h1>File Read Error</h1>");
    });
};

let server = http.createServer(router);

server.listen(process.env.PORT, () =>
  console.log(`Server is running at port ${process.env.PORT} !`)
);
