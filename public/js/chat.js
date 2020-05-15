const socket = io();

socket.on("Message", (message) => {
  console.log(message);
  document.querySelector("#message").textContent = message;
});

const input = document.querySelector("#text");

// TARGETING THE INPUT FIELD
document.querySelector("#submit").addEventListener("submit", (event) => {
  event.preventDefault();
  socket.emit("text", input.value);
});

// SENDING MESSAGES TO USERS
socket.on("newMessage", (message) => {
  console.log(message);
});

// GETTING CURRENT USER LOCATION
document.querySelector("#location").addEventListener("click", (event) => {
  event.preventDefault();
  if (!navigator.geolocation) {
    return alert("This browser doesnot support GeoLocation");
  }
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    const locationObj = {
      lat: latitude,
      long: longitude,
    };
    socket.emit("Location", locationObj);
  });
});
