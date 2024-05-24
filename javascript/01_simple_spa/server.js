const express = require("express");

const app = express();

// DATABASE
let database = [];
let id = 100;

// Checks if the "Content-Type" is "application/json" and then translates it into request body. (req.body)
app.use(express.json());

// Servers the frontend static files starting with index.html from folder "frontend"
app.use("/", express.static("frontend"));

// REST API
// base url: /api/shopping
// GET /api/shopping get the shoppinglist
// POST /api/shopping add new shopping item
// DELETE /api/shopping/:id remove the shopping item with id :id
// PUT /api/shopping/:id update the shopping item with the id :id

// Shopping item
// id: Number
// type: String
// count: Number
// price: Number
app.get("/api/shopping", (req, res) => {
  return res.status(200).json(database);
});

app.post("/api/shopping", (req, res) => {
  let item = {
    id: id,
    type: req.body.type,
    count: req.body.count,
    price: req.body.price,
  };
  id++;

  database.push(item);

  return res.status(201).json(item);
});

app.delete("/api/shopping/:id", (req, res) => {
  let tempId = parseInt(req.params.id); // parse the id from request parameters
  database = database.filter((item) => item.id !== tempId); // filter out the item with the given id

  return res.status(200).json({ message: "Success" }); // respond with success message
});

app.put("/api/shopping/:id", (req, res) => {
  let tempId = parseInt(req.params.id);
  let item = {
    id: tempId,
    type: req.body.type,
    count: req.body.count,
    price: req.body.price,
  };

  for (let i = 0; i < database.length; i++) {
    if (database[i].id === tempId) {
      database.splice(i, 1, item);

      return res.status(200).json({ message: "Success" });
    }
  }
  return res.status(404).json({ message: "Not Found" });
});

console.log("Running on port 3000");

app.listen(3000);
