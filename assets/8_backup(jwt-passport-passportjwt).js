require("dotenv").config();
let express = require("express");
let app = express();

app.listen(process.env.PORT, () =>
  console.log(`Server is listen at port ${process.env.PORT}`)
);

let bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let jwt = require("jsonwebtoken");
//jsonwebtoken start
app.post("/login", (req, res) => {
  let email = req.body.email;
  let pass = req.body.password;
  let user = userMap.get(email);
  if (user != null || user != undefined) {
    if (user.pass == pass) {
      let payload = { email: email };
      let token = jwt.sign(payload, process.env.SECRET);
      res.json({ token: token });
    } else {
      res.send({ data: "Password Error!" });
    }
  } else {
    res.send({ data: "Email Error" });
  }
});
//jsonwebtoken end

//passport and passport-jwt start
var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;
let userMap = new Map();
userMap.set("aa@gmail.com", { name: "aa", email: "aa@gmail.com", pass: "123" });
userMap.set("bb@gmail.com", { name: "bb", email: "bb@gmail.com", pass: "123" });
let myStrategy = new JwtStrategy(opts, function(payload, done) {
  let user = userMap.get(payload.email);
  if (user != null || user != undefined) {
    done(null, user);
  } else {
    done("no user with that email", null);
  }
});
let passport = require("passport"); //middleware
passport.use(myStrategy);
app.get("/free", (req, res) => res.send({ data: "free route hehee!" }));
app.get(
  "/secret",
  passport.authenticate("jwt", { session: false }),
  (req, res) => res.send({ data: "secret data for members" })
);
//passport and passport-jwt end