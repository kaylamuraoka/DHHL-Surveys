import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

// Connect to the database and check for errors
MongoClient.connect(process.env.MONGODB_URI, {
  // Only 50 people can connect at a time
  poolSize: 50,
  // after 2500 miliseconds the request will timeout
  wtimeout: 2500,
  useNewUrlParser: true,
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    // app.listen starts our web server
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
