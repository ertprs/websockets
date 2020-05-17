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

io.on("connection", (socket) => {
  socket.emit("Message", generateMessage(message));
  socket.broadcast.emit(
    "Message",
    generateMessage("A new user has joined the chat")
  );
  socket.on("text", (text, callback) => {
    io.emit("Message", generateMessage(text));
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
    io.emit("Message", generateMessage("A user has left the chat"));
  });
});

server.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
