require("dotenv").config();
let express = require("express");
let app = express();


app.listen(process.env.PORT, () =>
  console.log(`Server is listen at port ${process.env.PORT}`)
);


