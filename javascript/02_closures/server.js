const express = require("express");

const app = express();

app.use(express.static("frontend"));

console.log("Server in port 3000");

app.listen(3000);
