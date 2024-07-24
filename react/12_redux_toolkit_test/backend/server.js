import express from "express";

const app = express();

// DATABASE
let database = [];
let id = 100;

app.use(express.json());

// REST API
app.get("/api/shopping", (req, res) => {
  return res.status(200).json(database);
});

app.post("/api/shopping", (req, res) => {
  let item = {
    type: req.body.type,
    count: req.body.count,
    price: req.body.price,
    id: id,
  };
  id++;
  database.push(item);

  return res.status(201).json(item);
});

app.delete("/api/shopping/:id", (req, res) => {
  let tempId = parseInt(req.params.id);
  let tempDatabase = database.filter((item) => item.id !== tempId);

  database = tempDatabase;
  return res.status(200).json({ message: "Success." });
});

app.put("/api/shopping/:id", (req, res) => {
  let tempId = parseInt(req.params.id);
  let item = {
    type: req.body.type,
    count: req.body.count,
    price: req.body.price,
    id: tempId,
  };

  for (let i = 0; i < database.length; i++) {
    if (database[i].id === tempId) {
      database.splice(i, 1, item);

      return res.status(200).json({ message: "Success." });
    }
  }

  return res.status(404).json({ message: "Not Found." });
});

console.log("Server in port 3000");

app.listen(3000);
