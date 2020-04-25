import generator from "./gameGenerator"

export var mongoose = require('mongoose');

var connection = mongoose.createConnection('mongodb://localhost:27017/coconutplay');

export var Schema = mongoose.Schema;

export var GameSchema = new Schema({
  title: {
      type: String
  },
  author: {
    type: String
},
  bannerPath: {
    type: String
  },
  name: {
    type: String, 
  },
  grade: {
    type: String
  },
  category: {
    type: String
  },
  content: {
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

var query = Game.find(null)

let list = [];

const generate = async () => {
  if (list.length <= 0) {
    list = await generator.generate();
  }
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

const create = ({title, author, bannerPath, name, grade, category, content}) => {
  const game = {
    id: count(),
    title: title || "Default Title",
    author: author || "Default author",
    bannerPath: bannerPath || generator.getDefaultImageUrl(count()),
    name: name || "Default Game",
    grade: grade || 0,
    category: category,
    content: content || "Default text",
    createdDate: new Date()
  }
  
  
  list.push(game);

  var newGame = new Game({ title: title || "Default Title",
  author: author || "Default author",
  bannerPath: bannerPath ,//|| generator.getDefaultImageUrl(count()),
  name: name || "Default Game",
  grade: grade || 0,
  category: category,
  content: content || "Default text",});

  newGame.save().catch(function(err){
    throw err;
});
  return game;
}

const refresh = () => {
  //console.log(Game.find({title: 'title'}));
  //list = Game.find();
  /*Game.find(function (err,type) {
    if (err) { throw err;}
    console.log(type[0].grade);
      const game = {
        id: count(),
        title: type[0].title || "Default Title",
        author: type[0].author || "Default author",
        bannerPath: type[0].bannerPath || generator.getDefaultImageUrl(count()),
        name: type[0].name || "Default Game",
        grade: type[0].grade || 0,
        category: type[0].category,
        content: type[0].content || "Default text",
        createdDate: new Date()
      }          
      list.push(game);
    
    
  })  
  */
};
  


export default {
  generate,
  all,
  allByCategory,
  find,
  isExist,
  count,
  create,
  refresh
};