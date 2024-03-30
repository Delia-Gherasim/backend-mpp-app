const express = require("express");

const router = express.Router();
const controller = require("../controllers/brandsController");
router.get("/", (req, res) => {
  res.json(controller.getAll());
});
router.get("/byCategory", (req, res) => {
  const category = req.params.category;
  res.json(controller.getAllByCategory(category));
});
router.post("/byCategory", (req, res) => {
  const category = req.params.category;
  const brand = req.params.brand;
  res.send(controller.addTypeForCategory(category, brand));
});
module.exports = router;
