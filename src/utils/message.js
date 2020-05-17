const generateMessage = text => {
  return {
    text: text.message,
    createdAt: new Date().getTime(),
    username: text.username
  };
};

const generateLocationMessage = location => {
  return {
    location,
    createdAt: new Date().getTime()
  };
};

module.exports = { generateMessage, generateLocationMessage };
