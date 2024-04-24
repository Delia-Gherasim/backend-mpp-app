const express = require("express");
const router = express.Router();
const controller = require("../controllers/statisticsController");

router.get("/", (req, res) => {
  res.send("Statistics");
});

router.get("/categPerc", async (req, res) => {
  try {
    const result = await controller.percentagesOfEachCategory(); 
    res.json(result); 
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
});

router.get("/typePerc", async (req, res) => {
  try {
    const category = req.query.category; 
    const result = await controller.percentagesOfEachTypeForACategory(category); 
    res.json(result); 
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
});

router.get("/brandPerc", async (req, res) => {
  try {
    const type = req.query.type; 
    const result = await controller.percentagesOfEachBrandForAType(type); 
    res.json(result); 
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
});

router.get("/owner", async (req, res) => {
  try {
    const result = await controller.countOwnerWithMostDevices(); 
    res.json(result); 
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
});

module.exports = router;
