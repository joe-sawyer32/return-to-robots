// IMPORTS
const express = require("express");
const app = require(express());
const port = process.env.port || 8000;
const path = require("path");

const mustacheExpress = require("mustache-express");
const users = require(path.join(__dirname, "/data.js"));
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

// SET VIEW ENGINE
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", path.join(__dirname, "/views"));

// MIDDLEWARE
app.use("/", express.static(path.join(__dirname, "/public")));

//ROUTES
app.get("/", (req, res) => {});

app.get("/user/:id", (req, res) => {});

app.listen(port, () => {
  console.log(`Spinning with express: Port ${port}`);
});
