const express = require("express");
const router = express.Router();
const controller = require("../controllers/typesController");

router.get("/", (req, res) => {
  res.json(controller.getAll());
});
router.get("/byCategory", (req, res) => {
  const category = req.params.category;
  res.json(controller.getAllByCategory(category));
});
router.post("/byCategory", (req, res) => {
  const category = req.params.category;
  const type = req.params.type;
  res.send(controller.addTypeForCategory(category, type));
});
module.exports = router;
