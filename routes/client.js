const express = require("express");
const router = express.Router();
const controller = require("../controllers/clientsController");
const Client = require("../models/client");

router.get("/", async (req, res) => {
  try {
    const clients = await controller.getAll();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newItemData = req.body;
    const newItem = new Client(
      newItemData.id,
      newItemData.category,
      newItemData.type,
      newItemData.brand,
      newItemData.owner,
      newItemData.accessories,
      newItemData.warranty,
      new Date(newItemData.date)
    );
    const result = await controller.addClient(newItem);
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
      const client = await controller.getClientById(id);
      if (!client) {
        res.status(404).json({ error: "Client not found" });
      } else {
        res.json(client);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .put(async (req, res) => {
    try {
      const newItemData = req.body;
      const newItem = new Client(
        newItemData.id,
        newItemData.name,
        newItemData.surname,
        newItemData.phoneNumber,
        newItemData.email,
        newItemData.debt,
        newItemData.extraDetails,
        new Date(newItemData.date)
      );
      const result = await controller.updateClient(newItem);
      if (!result) {
        res.status(404).json({ error: "Client not found" });
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
      const result = await controller.deleteClientById(id);
      if (!result) {
        res.status(404).json({ error: "Client not found" });
      } else {
        res.json(result);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
