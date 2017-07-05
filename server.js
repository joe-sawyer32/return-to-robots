// IMPORTS
const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
const port = process.env.port || 8000;
const path = require("path");

// MONGO
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const dbUrl = "mongodb://localhost:27017/return-to-robotsDB";
let DB;
let USERS;
MongoClient.connect(dbUrl, (error, db) => {
  if (error) {
    console.warn("Unable to establish connection to the database", error);
  }
  DB = db;
  USERS = db.collection("users");
});

// SET VIEW ENGINE
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", path.join(__dirname, "/views"));

// MIDDLEWARE
app.use("/", express.static(path.join(__dirname, "/public")));

//ROUTES
app.get("/users", (req, res) => {
  USERS.find({}).toArray((error, foundUsers) => {
    if (error) {
      res.status(500).send(error);
    }
    res.render("index", { userList: foundUsers });
  });
});

app.get("/users/employed", (req, res) => {
  USERS.find({ job: { $ne: null } }).toArray((error, foundUsers) => {
    if (error) {
      res.status(500).send(error);
    }
    res.render("employed", { userList: foundUsers });
  });
});

app.get("/users/available", (req, res) => {
  USERS.find({ job: null }).toArray((error, foundUsers) => {
    if (error) {
      res.status(500).send(error);
    }
    res.render("available", { userList: foundUsers });
  });
});

app.get("/users/:id", (req, res) => {
  let userId = parseInt(req.params.id);
  USERS.findOne({ id: userId }, (error, foundUser) => {
    if (error) {
      res.status(500).send(error);
    }
    res.render("user", { user: foundUser });
  });
});

app.listen(port, () => {
  console.log(`Spinning with express: Port ${port}`);
});
