let HOST = "localhost";
let PORT = 27017;
let DB = "coconutplay"
let URI = `mongodb://${HOST}:${PORT}/${DB}`

export default{
    HOST,
    PORT,
    DB,
    URI,
}