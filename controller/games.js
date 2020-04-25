import { ErrorCustomResponse, SuccessCustomResponse } from "../lib/customResponse"
import Game from "../model/game"
import Category from "../model/category"

export function getGames(req, res) {
  res.send(new SuccessCustomResponse( 200, "Games list received.", Game.all() ));
}

export function getGamesByCategory(req, res) {
  const {category} = req.params;

  if (!Category.isExist(category)) {
    res.status(404).send(
      new ErrorCustomResponse(404, `Error get all games by cagetory - category ${category} doesn't exist`)
    );
    return;
  }
  
  res.send(new SuccessCustomResponse(200, "Games list received.", Game.allByCategory(category)));
}

export function getGamesCount(req, res) {
  res.send(new SuccessCustomResponse( 200, "Games count received.", {count : Game.count()} ));
}

export function getGame(req, res) {
  const {id} = req.params
  const game = Game.find(id);

  if(!game) {
    res.status(404).send(new ErrorCustomResponse(404, `Game ${id} not found`));
    return;
  }

  res.send(new SuccessCustomResponse( 
    200, `Game ${id} received.`, game)
  )
}

export function putGame(req, res) {
  const {category} = req.body;

  if (!Category.isExist(category)) {
    res.status(404).send(
      new ErrorCustomResponse(404, `Error create game - category ${category} doesn't exist`)
    );
    return;
  }
  console.log(req.body);
  const gameCreated = Game.create(req.body);
  res.send(gameCreated)
}