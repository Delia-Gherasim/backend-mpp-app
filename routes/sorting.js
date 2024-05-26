const express = require("express");
const router = express.Router();
const controller = require("../controllers/sortingController");

router.get("/", (req, res) => {
  res.send("sorting");
});

router.get("/type", async (req, res) => {
  try {
    const result = await controller.sortByTypeAscending(); 
    res.json(result); 
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
});

router.get("/category", async (req, res) => {
  try {
    const result = await controller.sortByCategoryAscending();
    res.json(result); 
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
});

router.get("/brand", async (req, res) => {
  try {
    const result = await controller.sortByBrandAscending();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/owner", async (req, res) => {
  try {
    const result = await controller.sortByOwnerAscending();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/date", async (req, res) => {
  try {
    const result = await controller.sortByDateAscending();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
