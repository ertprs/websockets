const users = [];

const addUser = (id, room, username) => {
  // TRIM WHITESPACE
  room = room.trim().toLowerCase();
  username = username.trim().toLowerCase();

  //  CHECK FOR ROOM AND USER
  if (!room || !username) {
    return {
      error: "Username and Room are required"
    };
  }
  // CHECK FOR EXTISTING USER
  const existingUser = users.find(
    user => user.username === username && user.room === room
  );
  if (existingUser) {
    return {
      error: "Username is in use"
    };
  }
  const user = { id, username, room };
  users.push(user);
  return {
    user
  };
};

const removeUser = id => {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = id => users.find(user => user.id === id);

const getUsersInRoom = room => {
  room = room.trim().toLowerCase();
  return users.filter(user => user.room === room);
};
