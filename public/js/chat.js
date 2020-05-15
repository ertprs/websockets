const socket = io();

socket.on("Message", (message) => {
  console.log(message);
  document.querySelector("#message").textContent = message;
});

const input = document.querySelector("#text");

document.querySelector("#submit").addEventListener("submit", (event) => {
  event.preventDefault();
  socket.emit("text", input.value);
});

socket.on("newMessage", (message) => {
  console.log(message);
});
