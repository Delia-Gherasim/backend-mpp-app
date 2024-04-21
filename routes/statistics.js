const express = require("express");
const router = express.Router();
const controller = require("../controllers/statisticsController");

router.get("/", (req, res) => {
  res.send("Statistics");
});

// Asynchronous version of the route handlers with error handling
router.get("/categPerc", async (req, res) => {
  try {
    const result = await controller.percentagesOfEachCategory(); // Asynchronous call
    res.json(result); // Return as JSON
  } catch (error) {
    res.status(500).json({ error: error.message }); // Error handling
  }
});

router.get("/typePerc", async (req, res) => {
  try {
    const category = req.query.category; // Extract query parameter
    const result = await controller.percentagesOfEachTypeForACategory(category); // Asynchronous call
    res.json(result); // Return as JSON
  } catch (error) {
    res.status(500).json({ error: error.message }); // Error handling
  }
});

router.get("/brandPerc", async (req, res) => {
  try {
    const type = req.query.type; // Extract query parameter
    const result = await controller.percentagesOfEachBrandForAType(type); // Asynchronous call
    res.json(result); // Return as JSON
  } catch (error) {
    res.status(500).json({ error: error.message }); // Error handling
  }
});

router.get("/owner", async (req, res) => {
  try {
    const result = await controller.countOwnerWithMostDevices(); // Asynchronous call
    res.json(result); // Return as JSON
  } catch (error) {
    res.status(500).json({ error: error.message }); // Error handling
  }
});

module.exports = router;
