const http = require("http");
const path = require("path");
const express = require("express");
const socketio = require("socket.io");

const { generateMessage, generateLocationMessage } = require("./utils/message");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "../public")));

let message = "Welcome";
io.on("connection", socket => {
  // LISTENING FOR THE NEW USER
  socket.on("join", ({ username, room }) => {
    socket.emit("Message", generateMessage({ message, username }));
    socket.broadcast
      .to(room)
      .emit(
        "Message",
        generateMessage({ message: `user has joined the chat` })
      );
  });

  socket.on("text", ({ message, username }, callback) => {
    io.emit("Message", generateMessage({ message, username }));
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
    io.emit("Message", generateMessage({ message: `user has left the chat` }));
  });
});

server.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
