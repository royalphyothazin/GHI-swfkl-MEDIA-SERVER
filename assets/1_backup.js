let http = require("http");
let url = require("url");
let qs = require("querystring");
let fs = require("fs");
require("dotenv").config();

// let routes = {
//   GET: () => {
//     console.log("GET Request");
//   },
//   POST: () => {
//     console.log("POST Request");
//   }
// };

// let routes = {
//   GET: {
//     "/": () => console.log("Method GET and Path /"),
//     "/home": () => console.log("Method GET and Path /home")
//   },
//   POST: {
//     "/": () => console.log("Method POST and Path /"),
//     "/home": () => console.log("Method POST and Path /home")
//   }
// };

// let routes = {
//   GET: {
//     "/": (req, res, params) => {
//       res.writeHead(200, { "Content-Type": "text/html" });
//       res.end("<h1>GET Method => / route</h1>");
//     },
//     "/home": (req, res, params) => {
//       res.writeHead(200, { "Content-Type": "text/html" });
//       res.end(
//         `<h1>GET Method => /home route => params of ${params.query.name} and ${params.query.age}</h1>`
//       );
//     }
//   },
//   POST: {
//     "/": (req, res, params) => {
//       res.writeHead(200, { "Content-Type": "text/html" });
//       res.end("<h1>POST Method => / route</h1>");
//     },
//     "/home": (req, res) => {
//       res.writeHead(200, { "Content-Type": "text/html" });
//       res.end("<h1>POST Method => /home route</h1>");
//     }
//   },
//   NA: (req, res, params) => {
//     res.writeHead(404);
//     res.end("<h1>No Page for that Route</h1>");
//   }
// };
// let responder = (req, res, param) => {
//   res.writeHead(200, { "Content-Type": "text/html" });
//   res.end(param);
// };
let myFileReader = (filepath, res) => {
  fs.access(filepath, fs.F_OK, err => {
    if (err) {
      res.writeHead(404, { "Content-type": "text/html" });
      res.end("<h1>File Not Found</h1>");
    } else {
      fs.readFile(filepath, (err, data) => {
        if (err) throw err;
        res.writeHead(200, { "Content-type": "text/html" });
        res.end(data);
      });
    }
  });
};
let routes = {
  GET: {
    "/": (req, res) => {
      let filepath = __dirname + "/index.html";
      // responder(req, res, `<h1>GET Method => / route</h1>`);
      //responder(req, res, filepath);
      myFileReader(filepath, res);
    },
    // "/home": (req, res) => {
    //   responder(
    //     req,
    //     res,
    //     `<h1>GET Method => /home route => params of ${params.query.name} and ${params.query.age}</h1>`
    //   );
    // },
    "/index.html": (req, res) => {
      //console.log(__dirname);
      let filepath = __dirname + "/index.html";
      //responder(req, res, filepath);
      myFileReader(filepath, res);
    },
    "/about.html": (req, res) => {
      //console.log(__dirname);
      let filepath = __dirname + "/about.html";
      //responder(req, res, filepath);
      myFileReader(filepath, res);
    }
  },
  POST: {
    "/": (req, res) => {
      responder(req, res, `<h1>POST Method => / route</h1>`);
    },
    "/api/login": (req, res) => {
      let body = "";
      req.on("data", data => {
        body += data;
        if (body.length > 1024) {
          res.writeHead(403, { "Content-type": "text/html" });
          res.end("<h1>File Size Over 1mb</h1>");
        }
      });
      req.on("end", () => {
        //console.log(body);//email=>mgmg&password=123123
        let query = qs.parse(body);
        console.log(query, query.email, query.password); //{email:mgmg,password:123123}
        res.end();
      });
    }
  },
  NA: (req, res) => {
    responder(req, res, `<h1>No Page for that Route</h1>`);
  }
};
let start = (req, res) => {
  // console.log(req);
  // console.log(req.method);

  // res.writeHead(200, { "Content-type": "text/html" });
  // if (req.method == "GET") {
  //   res.end("GET Request");
  // } else {
  //   res.end("POST Request");
  // }

  //routes[req.method]();

  let reqMethod = req.method;
  // let path = req.url;
  // routes[reqMethod][path]();
  let params = url.parse(req.url, true);
  // let name = params.query.name;
  // let age = params.query.age;
  // console.log(params, name, age);
  //console.log(urlObj);
  // routes[reqMethod][urlObj.pathname](req, res);
  let resolveRoute = routes[reqMethod][params.pathname];
  //console.log(resolveRoute);
  if (resolveRoute != null && resolveRoute != undefined) {
    //resolveRoute(req, res, params);
    resolveRoute(req, res);
  } else {
    // routes["NA"](req, res, params);
    routes["NA"](req, res);
  }
};

let server = http.createServer(start);

// server.listen(3000, () => console.log("Server is running at port 3000 !"));
server.listen(process.env.PORT, () =>
  console.log(`Server is running at port ${process.env.PORT} !`)
);
