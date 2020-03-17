require("dotenv").config();
let express = require("express");
let app = express();

let server = require("http").createServer(app); //http-htmlRender
server.listen(process.env.PORT, () =>
  console.log(`Server is listen at port ${process.env.PORT}`)
);
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
io.sockets.on("connection", socket => {
  socket.on("login", data => {
    //console.log(data)
    // io.emit('login-success',`From Server ${data}`)
    //io.emit("login-success", true)
    socket.username = data;
    io.sockets.connected[socket.id].emit("login-success", true); //according to socket id
  });
  socket.on("msg", data =>
    //console.log(data);
    // io.emit("income-msg", data)
    io.emit("income-msg", `${socket.username} : ${data}`)
  );
});

let path = require("path"); //img path
app.use(express.static(path.join(__dirname, "assets"))); //img path

let hogan = require("hogan-express"); //hogan template
app.engine("html", hogan); //hogan template
app.set("view engine", "html"); //hogan template
app.get("/login", (req, res) => res.render("index"));
