const express = require("express");
const router = express.Router();
const controller = require("../controllers/crudController");
const Device = require("../models/device");

router.get("/", async (req, res) => {
  try {
    const devices = await controller.getAll();
    res.json(devices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newItemData = req.body;
    const newItem = new Device(
      newItemData.id,
      newItemData.category,
      newItemData.type,
      newItemData.brand,
      newItemData.owner,
      newItemData.accessories,
      newItemData.warranty,
      new Date(newItemData.date)
    );
    const result = await controller.addDevice(newItem);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const id = Number(req.params.id);
      const device = await controller.getDeviceById(id);
      if (!device) {
        res.status(404).json({ error: "Device not found" });
      } else {
        res.json(device);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .put(async (req, res) => {
    try {
      const newItemData = req.body;
      const newItem = new Device(
        newItemData.id,
        newItemData.category,
        newItemData.type,
        newItemData.brand,
        newItemData.owner,
        newItemData.accessories,
        newItemData.warranty,
        new Date(newItemData.date)
      );
      const result = await controller.updateDevice(newItem);
      if (!result) {
        res.status(404).json({ error: "Device not found" });
      } else {
        res.json(result);
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const id = Number(req.params.id);
      const result = await controller.deleteDeviceById(id);
      if (!result) {
        res.status(404).json({ error: "Device not found" });
      } else {
        res.json(result);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
