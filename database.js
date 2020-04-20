import mongoose from "mongoose"
import configDB from "./config/database.js"

const instanciate = () => {
    mongoose.connect(configDB.URI, {useNewUrlParser: true, useUnifiedTopology: true});
    const db = mongoose.connection;
    db.on("error", error => console.log(error));
    db.once("open", () => console.log("connection établie"));

}

export default instanciate