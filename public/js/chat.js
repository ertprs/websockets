const socket = io();

socket.on("updateCount", (count) => {
  console.log(`The count has been updated ${count}`);
});

document.querySelector("#increment").addEventListener("click", () => {
  socket.emit("increment");
});
