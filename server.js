import express from "express"
import bodyParser from 'body-parser'
import cors from 'cors'
import routes from './router.js'
import routesDatabase from './routerDatabase.js'
import game from "./model/game"
import instanciate from './database.js'


const app = express();
const PORT = 3000;

instanciate();




app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

//Root route to test the API status
app.get('/', (req, res) => {
  res.send("Server is listening...");
});

//Inject the different routes availables
routesDatabase(app);
routes(app);


// If the route doesn't exist, send 404 error
app.use((req, res) => {
  res.status(404).send({url: `${req.originalUrl} not found`})
});

game.generate()
  .then(() => {
    //The server is now able to listen the request
    app.listen(PORT, () =>
      console.log(`Node server running on ${PORT}!`),
    );
  })
  .catch(() => {
    console.log("Error to generate default game test.")
  });

