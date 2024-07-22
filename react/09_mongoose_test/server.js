const express = require("express");
const mongoose = require("mongoose");

const app = express();

const mongo_url = process.env.MONGODB_URL;
const mongo_user = process.env.MONGODB_USER;
const mongo_password = process.env.MONGODB_PASSWORD;

const url =
  "mongodb+srv://" +
  mongo_user +
  ":" +
  mongo_password +
  "@" +
  mongo_url +
  "?retryWrites=true&w=majority&appName=opiframejutut";

mongoose.connect(url).then(
  () => console.log("Connected to Mongo Atlas."),
  (err) => console.log("Failed to connect Mongo Atlas.", err)
);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
