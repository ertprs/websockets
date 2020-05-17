const generateMessage = text => {
  return {
    text: text.message,
    createdAt: new Date().getTime(),
    username: text.username
  };
};

const generateLocationMessage = message => {
  return {
    location: message.location,
    createdAt: new Date().getTime(),
    username: message.username
  };
};

module.exports = { generateMessage, generateLocationMessage };
