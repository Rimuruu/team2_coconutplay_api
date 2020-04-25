//import generator from "./gameGenerator"

export var mongoose = require('mongoose');

var connection = mongoose.createConnection('mongodb://localhost:27017/coconutplay');

export var Schema = mongoose.Schema;

export var CommentSchema = new Schema({
  gameId: {
      type: String
  },
  username: {
    type: String
},
  email: {
    type: String
  },
  text: {
    type: String, 
  },
  created:{
      type : Date,
      default : Date.now
  }})

  export var Comment = mongoose.model('comment', CommentSchema);

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
  
  var newComment = new Comment({ 
    gameId,
    username: username || "Default Username",
    email: email || "default@default.com",
    text: text || "Default comment"
});

  newComment.save().catch(function(err){
    throw err;
});
  return allByGame(gameId);
};

export default {
  all,
  allByGame,
  create,
};
