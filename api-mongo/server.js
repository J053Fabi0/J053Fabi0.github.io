const express = require("express");
const { connect } = require("./db");
const userServices = require("./services/userServices");
// const { MongoClient } = require("mongodb");

const app = express();

const MONGO_URI =
  "mongodb+srv://josefabio:SFjpVqPBlVQ8yOHPSNg6Zu3TpKgtP6iCBjFVeTxB0uu9geoTC@cluster0.nxpoi.mongodb.net/apimongo?retryWrites=true&w=majority";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get("/users", (req, res) => {
//   // regresar todos los users
//   MongoClient.connect(MONGO_URI, function (err, db) {
//     if (err) throw err;

//     const database = db.db("apimongo");
//     const collection = database.collection("users");

//     collection.find({}).toArray(function (err, results) {
//       res.status(200).send(results);
//       db.close(); // Cierra la conexión
//     });
//   });
// });

// // crear un nuevo user
// app.post("/users", (req, res) => {
//   MongoClient.connect(MONGO_URI, function (err, db) {
//     if (err) throw err;
//     console.log("Connected to database");

//     const database = db.db("apimongo");
//     const collection = database.collection("users");

//     collection.insertOne(req.body, function (err, result) {
//       if (err) throw err;
//       const [user] = result.ops;
//       res.status(201).send(user);

//       db.close(); // Cierra la conexión
//     });
//   });
// });

// regresar todos los users
app.get("/users", async (req, res) => {
  try {
    const users = await userServices.findAll();
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send(err);
  }
});

// crear un nuevo user
app.post("/users", async (req, res) => {
  try {
    const user = await userServices.create(req.body);
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

connect(MONGO_URI, (err) => {
  if (err) {
    console.log("Unable to connect to mongo");
    process.exit(1);
  }

  app.listen(3000, () => console.log("Server running on port 3000"));
});
