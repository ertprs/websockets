const http = require("http");
const path = require("path");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "../public")));

io.on("connection", () => console.log("new web server connection"));

server.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
