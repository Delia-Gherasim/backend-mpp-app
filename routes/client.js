const express = require("express");
const router = express.Router();
const controller = require("../controllers/clientsController");
const Client = require("../models/client");


router.get("/", async (req, res, next) => {
  try {
    const nrOfItems = parseInt(req.query.nr) || 50;
    const pageNr = parseInt(req.query.page) || 1;
    const data = await controller.getPagesOfNItems(nrOfItems, pageNr); 
    res.json(data); 
  } catch (error) {
    next(error); 
  }
});

router.post("/", async (req, res) => {
  try {
    const newItemData = req.body;
    const newItem = new Client(
      newItemData.id,
      newItemData.name,
      newItemData.surname,
      newItemData.phoneNumber,
      newItemData.email,
      newItemData.debt,
      newItemData.extraDetails
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
        newItemData.extraDetails
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
router.post("/getDevicesOfClient", async (req, res) => {
  //console.log("Received data:", req.body);
  try {
    const { name, surname, phoneNumber, email } = req.body;
    const client = new Client(
      null,
      name,
      surname,
      phoneNumber,
      email,
      null,
      null
    );
    const result = await controller.getDevicesOfClient(client);
    console.log("O GASIT: ", result);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/getDataOfClient", async (req, res) => {
  //console.log("Received data:", req.body);
  try {
    const { name, surname, phoneNumber, email } = req.body;
    const client = new Client(
      null,
      name,
      surname,
      phoneNumber,
      email,
      null,
      null
    );
    const result = await controller.getAllClientData(client);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
