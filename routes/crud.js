const express = require("express");
const router = express.Router();
const controller = require("../controllers/crudController");
const Device = require("../models/device");

router.get("/", (req, res) => {
  res.json(controller.getAll());
});

router.post("/", (req, res) => {
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
  res.json(controller.addDevice(newItem));
});

router
  .route("/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    res.json(controller.getDeviceById(id));
  })
  .put((req, res) => {
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
    res.json(controller.updateDevice(newItem));
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    res.json(controller.deleteDeviceById(id));
  });

module.exports = router;
