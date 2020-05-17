const http = require("http");
const path = require("path");
const express = require("express");
const socketio = require("socket.io");

const { generateMessage, generateLocationMessage } = require("./utils/message");
const {
  getUser,
  getUsersInRoom,
  removeUser,
  addUser
} = require("./utils/user");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "../public")));

let message = "Welcome";
io.on("connection", socket => {
  // LISTENING FOR THE NEW USER
  socket.on("join", ({ username, room }, callback) => {
    const { user, error } = addUser(socket.id, room, username);
    if (error) {
      return callback(error);
    }
    socket.join(user.room);
    socket.emit(
      "Message",
      generateMessage({ message, username: user.username })
    );
    socket.broadcast
      .to(user.room)
      .emit(
        "Message",
        generateMessage({ message: `${user.username} has joined the chat` })
      );
    callback();
  });

  socket.on("text", ({ message, username }, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("Message", generateMessage({ message, username }));
    callback();
  });

  socket.on("Location", (location, callback) => {
    io.emit(
      "LocationMessage",
      generateLocationMessage(
        `https://google.com/maps?q=${location.lat},${location.long}`
      )
    );
    callback();
  });
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        "Message",
        generateMessage({ message: `${user.username} has left the chat` })
      );
    }
  });
});

server.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
