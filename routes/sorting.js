const express = require("express");
const router = express.Router();
const controller = require("../controllers/sortingController");

router.get("/", (req, res) => {
  res.send("sorting");
});

router.get("/type", (req, res) => {
  res.send(controller.sortByTypeAscending());
});
router.get("/category", (req, res) => {
  res.send(controller.sortByCategoryAscending());
});
router.get("/brand", (req, res) => {
  res.send(controller.sortByBrandAscending());
});
router.get("/owner", (req, res) => {
  res.send(controller.sortByOwnerAscending());
});
router.get("/date", (req, res) => {
  res.send(controller.sortByDateAscending());
});

module.exports = router;
