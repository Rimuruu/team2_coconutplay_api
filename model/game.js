import generator from "./gameGenerator"

// Array provide game objects
// these one are build as :
// {id. title, author, bannerPath, name, grade, category, content, createdDate}
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
  return game;
}

export default {
  generate,
  all,
  allByCategory,
  find,
  isExist,
  count,
  create
};