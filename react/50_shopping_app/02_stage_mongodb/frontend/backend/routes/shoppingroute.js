const express = require("express");
const itemModel = require("../models/item");

const router = express.Router();

// Database
let database = [];
let id = 100;

// Rest API
router.get("/shopping", (req, res) => {
  itemModel
    .find()
    .then((items) => {
      return res.status(200).json(items);
    })
    .catch((error) => {
      console.log("Failed finding items, Reason: ", error);
      return res.status(500).json({ Message: "Internal server error" });
    });
});

router.post("/shopping", (req, res) => {
  if (!req.body) {
    return res.status(400).json({ Message: "Bad request" });
  }

  if (!req.body.type) {
    return res.status(400).json({ Message: "Item type is required" });
  }

  let item = new itemModel({
    type: req.body.type,
    count: req.body.count,
    price: req.body.price,
  });

  item
    .save()
    .then((item) => {
      return res.status(201).json(item);
    })
    .catch((error) => {
      console.log("Failed saving item, Reason: ", error);
      return res.status(500).json({ Message: "Internal server error" });
    });
});

router.delete("/shopping/:id", (req, res) => {
  itemModel
    .deleteOne({ _id: req.params.id })
    .then(() => {
      return res.status(200).json({ Message: "Success" });
    })
    .catch((error) => {
      console.log("Failed deleting item, Reason: ", error);
      return res.status(500).json({ Message: "Internal server error" });
    });
});

router.put("/shopping/:id", (req, res) => {
  if (!req.body) {
    return res.status(400).json({ Message: "Bad request" });
  }

  if (!req.body.type) {
    return res.status(400).json({ Message: "Item type is required" });
  }

  let item = {
    type: req.body.type,
    count: req.body.count,
    price: req.body.price,
  };

  itemModel
    .replaceOne({ _id: req.params.id }, item)
    .then(() => {
      return res.status(200).json({ Message: "Success" });
    })
    .catch((error) => {
      console.log("Failed updating item, Reason: ", error);
      return res.status(500).json({ Message: "Internal server error" });
    });
});

module.exports = router;
