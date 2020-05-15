const socket = io();

// ELEMENTS
const $form = document.querySelector("#submit");
const $formBtn = document.querySelector("#formBtn");
const $input = document.querySelector("#text");
const $locationButton = document.querySelector("#location");
const $message = document.querySelector("#message");

// TEMPLATES
const $messageTemplate = document.querySelector("#message-template").innerHTML;

// WELCOME MESSAGE FIRST AND SENDING MESSAGES TO USERS
socket.on("Message", (message) => {
  const html = Mustache.render($messageTemplate, { message });
  $message.insertAdjacentHTML("beforeend", html);

  $input.value = "";
  $input.focus();
});

// TARGETING THE INPUT FIELD AND DELIVERING MESSAGE
$form.addEventListener("submit", (event) => {
  event.preventDefault();
  $formBtn.setAttribute("disabled", "disabled");

  socket.emit("text", $input.value, () => {
    $formBtn.removeAttribute("disabled");
    console.log("message delivered");
  });
});

// GETTING CURRENT USER LOCATION
$locationButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (!navigator.geolocation) {
    return alert("This browser doesnot support GeoLocation");
  }
  $locationButton.setAttribute("disabled", "disabled");
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    const locationObj = {
      lat: latitude,
      long: longitude,
    };
    socket.emit("Location", locationObj, () => {
      console.log("location shared");
      $locationButton.removeAttribute("disabled");
    });
  });
});
