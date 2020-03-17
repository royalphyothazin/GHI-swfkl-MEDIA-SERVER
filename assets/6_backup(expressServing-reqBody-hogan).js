require("dotenv").config();

let express = require("express"),
  app = express(),
  path = require("path");

// app.use(express.static(path.join("assets"))); //middleware
// app.get("/", (req, res) => {
//   res.json({ con: true, msg: "Hello World!" });
// });

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });
// app.get("/loading", (req, res) => {
//   res.sendFile(__dirname + "/loading.html");
// });
// app.get("/index", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });
// app.get("/about", (req, res) => {
//   res.sendFile(__dirname + "/about.html");
// });

//bodyParser
let bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //middleware
app.get("/api/post/:id", (req, res) => {
  let id = req.params.id;
  res.send(`Param id is ${id}`);
});
app.get("/api/user", (req, res) => {
  let name = req.query.name;
  let age = req.query.age;
  res.send(`Query name is ${name} and Query age is ${age}`);
});
app.post("/api/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  res.send(`BParser email is ${email} and BParser password is ${password}`);
});

//hoganTemplate
let hogan = require("hogan-express");
app.engine("html", hogan);
app.set("view engine", "html");
app.use(express.static(path.join(__dirname, "assets"))); //middleware
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/loading", (req, res) => {
  res.render("loading");
});
app.get("/index", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at Port ${process.env.PORT}`);
});
