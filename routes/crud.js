const express = require("express");
const router = express.Router();
const controller = require("../controllers/crudController");
const Device = require("../models/device");

// Get all devices
router.get("/", async (req, res) => {
  try {
    const devices = await controller.getAll(); // Async call
    res.json(devices); // Return JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors
  }
});

// Add a new device
router.post("/", async (req, res) => {
  try {
    const newItemData = req.body; // Extract request data
    const newItem = new Device(
      newItemData.id,
      newItemData.category,
      newItemData.type,
      newItemData.brand,
      newItemData.owner,
      newItemData.accessories,
      newItemData.warranty,
      new Date(newItemData.date) // Convert to Date object
    );
    const result = await controller.addDevice(newItem); // Async call
    res.json(result); // Return JSON response
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handle errors
  }
});

// Routes for getting, updating, and deleting a device by ID
router.route("/:id")
  .get(async (req, res) => {
    try {
      const id = Number(req.params.id); // Convert ID to a number
      const device = await controller.getDeviceById(id); // Async call
      if (!device) {
        res.status(404).json({ error: "Device not found" }); // Handle not found
      } else {
        res.json(device); // Return JSON response
      }
    } catch (error) {
      res.status(500).json({ error: error.message }); // Handle errors
    }
  })
  .put(async (req, res) => {
    try {
      const newItemData = req.body; // Extract request data
      const newItem = new Device(
        newItemData.id,
        newItemData.category,
        newItemData.type,
        newItemData.brand,
        newItemData.owner,
        newItemData.accessories,
        newItemData.warranty,
        new Date(newItemData.date) // Convert to Date object
      );
      const result = await controller.updateDevice(newItem); // Async call
      if (!result) {
        res.status(404).json({ error: "Device not found" }); // Handle not found
      } else {
        res.json(result); // Return JSON response
      }
    } catch (error) {
      res.status(400).json({ error: error.message }); // Handle errors
    }
  })
  .delete(async (req, res) => {
    try {
      const id = Number(req.params.id); // Convert ID to a number
      const result = await controller.deleteDeviceById(id); // Async call
      if (!result) {
        res.status(404).json({ error: "Device not found" }); // Handle not found
      } else {
        res.json(result); // Return JSON response
      }
    } catch (error) {
      res.status(500).json({ error: error.message }); // Handle errors
    }
  });

module.exports = router; // Export the router
