const MongoClient = require("mongodb").MongoClient;
const roomsDAO = require("../dao/rooms");

MongoClient.connect(process.env.MONGO_URI, {
  poolSize: 50,
  wtimeout: 2500,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .then(async (client) => {
    await roomsDAO.initDB(client);
  });
