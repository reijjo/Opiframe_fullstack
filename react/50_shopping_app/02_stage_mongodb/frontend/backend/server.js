const express = require("express");
const shoppingRoute = require("./routes/shoppingroute");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const mongo_url = process.env.MONGODB_URL;
const mongo_user = process.env.MONGODB_USER;
const mongo_password = process.env.MONGODB_PASSWORD;

const url = `mongodb+srv://${mongo_user}:${mongo_password}@${mongo_url}/shoppingdb?retryWrites=true&w=majority&appName=opiframejutut`;

mongoose.connect(url).then(() => {
  console.log("Connected to MongoDB"),
    (err) => console.log("Failed to connect to MongoDB, Reason: ", err);
});

mongoose.set("toJSON", { virtuals: true });

app.use("/api", shoppingRoute);

console.log("Server is running on port 3001");

app.listen(3001);
