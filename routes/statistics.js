const express = require("express");
const router = express.Router();
const controller = require("../controllers/statisticsController");

router.get("/", (req, res) => {
  res.send("Statistics");
});
router.get("/categPerc", (req, res) => {
  res.send(controller.percentagesOfEachCategory());
});
router.get("/typePerc", (req, res) => {
  const category = req.query.category;
  res.send(controller.percentagesOfEachTypeForACategory(category));
});
router.get("/brandPerc", (req, res) => {
  const type = req.query.type;
  res.send(controller.percentagesOfEachBrandForAType(type));
});
router.get("/owner", (req, res) => {
  res.send(controller.countOwnerWithMostDevices());
});

module.exports = router;
