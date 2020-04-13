//import generator from "./gameGenerator"

// Array provide comment objects
// these one are build as :
// {id, gameId, username, email, text, createdDate}
let list = [];

const all = () => {
  return list;
};

const allByGame = (gameId) => {
  return list.filter((x) => x.gameId === gameId);
};

const count = () => {
  return list.length;
};

const create = ({ gameId, username, email, text }) => {
  const comment = {
    id: count(),
    gameId,
    username: username || "Default Username",
    email: email || "default@default.com",
    text: text || "Default comment",
    createdDate: new Date(),
  };

  list.push(comment);
  return allByGame(gameId);
};

export default {
  all,
  allByGame,
  create,
};
