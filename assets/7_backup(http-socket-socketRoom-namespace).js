require("dotenv").config();
let express = require("express");
let app = express();

let server = require("http").createServer(app); //http-htmlRender
server.listen(process.env.PORT, () =>
  console.log(`Server is listen at port ${process.env.PORT}`)
);

let path = require("path"); //img path
app.use(express.static(path.join(__dirname, "assets"))); //img path

let hogan = require("hogan-express"); //hogan template
app.engine("html", hogan); //hogan template
app.set("view engine", "html"); //hogan template
app.get("/login", (req, res) => res.render("index"));

/**
Sending to All Users
  io.emit('key','val')
  #send message only to sender-client
  socket.emit('message','check this');
  #send to all listeners except sender
  socket.broadcast.emitt('chat-data',username+':'+data)

  #send message to certain user
  io.socket.connected[client[1]].emit("chat-data",username+':'+data)
  #send to specific socket-id (specific user)
  socket.broadcast.to(socketid).emit('chat-data',username+':'+data)
  io.sockets.connected[socket.id].emit('login-success',true)
 */
let io = require("socket.io").listen(server); //socket.io-liveChatRender
//socket and socketRoom start
let userMap = new Map();
let room1 = "public";
let room2 = "private";
io.sockets.on("connection", socket => {
  socket.on("login", data => {
    //console.log(data)
    // io.emit('login-success',`From Server ${data}`)
    //io.emit("login-success", true)
    socket.username = data;
    //.sockets.connected[socket.id].emit("login-success", true); //according to socket id
    userMap.set(socket.username, socket.id);
    if (socket.username == "w" || socket.username == "x") {
      socket.join(room1);
      socket.userroom = room1;
    } else {
      socket.join(room2);
      socket.userroom = room2;
    }
    socket.emit("login-success", true);
  });
  socket.on("msg", data =>
    //console.log(data);
    // io.emit("income-msg", data)
    //io.emit("income-msg", `${socket.username} : ${data}`)
    // io.in("public").emit("income-msg", `${socket.username} : ${data}`)
    io.in(socket.userroom).emit("income-msg", `${socket.username} : ${data}`)
  );
});
//socket and socketRoom end

// namespace start
let nspGame = io.of("/game");
let nspBook = io.of("/book");
nspGame.on("connection", socket => {
  socket.on("gamestart", data => {
    console.log(data);
  });
});
nspBook.on("connection", socket => {
  socket.on("bookstart", data => {
    console.log(data);
  });
});
// namespace end
