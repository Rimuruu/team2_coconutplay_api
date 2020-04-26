import generator from "./gameGenerator"

export var mongoose = require('mongoose');

var connection = mongoose.createConnection('mongodb://localhost:27017/coconutplay');

export var Schema = mongoose.Schema;

export var GameSchema = new Schema({
  id :{
    type: Number
  },
  title: {
      type: String
  },
  author: {
    type: String
},
  bannerPath: {
    type: Object
  },
  name: {
    type: String, 
  },
  grade: {
    type: Number
  },
  category: {
    type: String
  },
  content: {
    type: String
  },
  visibility: {
    type: String
  },
  created:{
      type : Date,
      default : Date.now
  }})

  export var Game = mongoose.model('game', GameSchema);

// Array provide game objects
// these one are build as :
// {id. title, author, bannerPath, name, grade, category, content, createdDate}



let list = [];

const generate = async () => {
  if (list.length <= 0) {
    list = await generator.generate();
  }
  Game.find({}).then(function(games){
    for(let i = 0; i<games.length; i++){
      list.push(games[i]);
    }
    
  })

}



const all = () => {
  return list;
}

const allByCategory = (category) => {
  return list.filter(x => x.category === category);
}

const count = () => {
  return list.length;
}

const find = (id) => {
  return list.find(x => x.id == id);
}

const isExist = (id) => {
  return list.some(x => x.id == id);
}

const create = ({title, author, bannerPath, name, grade, category, content,visibility}) => {
  const game = {
    id: count(),
    title: title || "Default Title",
    author: author || "Default author",
    bannerPath: bannerPath || generator.getDefaultImageUrl(count()),
    name: name || "Default Game",
    grade: grade || 0,
    category: category,
    content: content || "Default text",
    createdDate: new Date(),
    visibility:visibility || 'public'
  }
  

  list.push(game);

<<<<<<< HEAD
  var newGame = new Game(game);
=======
  var newGame = new Game({ title: title || "Default Title",
  author: author || "Default author",
  bannerPath: bannerPath ,//|| generator.getDefaultImageUrl(count()),
  name: name || "Default Game",
  grade: grade || 0,
  category: category,
  content: content || "Default text",});
>>>>>>> 11ba49c59d6a0432c13aee8d4eb9fedaca948685

  newGame.save().catch(function(err){
    throw err;
});
  return game;
}




export default {
  generate,
  all,
  allByCategory,
  find,
  isExist,
  count,
  create,

 
};