const socket = io();

// ELEMENTS
const $form = document.querySelector("#submit");
const $formBtn = document.querySelector("#formBtn");
const $input = document.querySelector("#text");
const $locationButton = document.querySelector("#location");
const $message = document.querySelector("#message");

// TEMPLATES
const $messageTemplate = document.querySelector("#message-template").innerHTML;
const $urlTemplate = document.querySelector("#url-template").innerHTML;

let $username;
// WELCOME MESSAGE FIRST AND SENDING MESSAGES TO USERS
socket.on("Message", message => {
  $username = message.username;
  console.log(message);
  const html = Mustache.render($messageTemplate, {
    createdAt: moment(message.createdAt).format("h:mm a"),
    username: message.username,
    message: message.text
  });
  $message.insertAdjacentHTML("beforeend", html);

  $input.value = "";
  $input.focus();
});

// RENDERING LOCATION MESSAGE
socket.on("LocationMessage", url => {
  const urlHtml = Mustache.render($urlTemplate, {
    url: url.location,
    createdAt: moment(url.createdAt).format("h:mm a")
  });
  $message.insertAdjacentHTML("beforeend", urlHtml);
});

// TARGETING THE INPUT FIELD AND DELIVERING MESSAGE
$form.addEventListener("submit", event => {
  event.preventDefault();
  $formBtn.setAttribute("disabled", "disabled");

  socket.emit("text", { message: $input.value, username }, () => {
    $formBtn.removeAttribute("disabled");
    console.log("message delivered");
  });
});

// GETTING CURRENT USER LOCATION
$locationButton.addEventListener("click", event => {
  event.preventDefault();
  if (!navigator.geolocation) {
    return alert("This browser doesnot support GeoLocation");
  }
  $locationButton.setAttribute("disabled", "disabled");
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    const locationObj = {
      lat: latitude,
      long: longitude
    };
    socket.emit("Location", locationObj, () => {
      console.log("location shared");
      $locationButton.removeAttribute("disabled");
    });
  });
});

// SENDING THE QUERYSTRING TO THE SERVER
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});
socket.emit("join", { username, room });

socket.on("test", message => {
  console.log(message);
});
