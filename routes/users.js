const express = require("express");
const router = express.Router();
const controller = require("../controllers/usersController");
const User = require("../models/user");

router.get("/", async (req, res, next) => {
  try {
    const data = await controller.getAll();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const newItemData = req.body;
    const newItem = new User(
      newItemData.id,
      newItemData.name,
      newItemData.surname,
      newItemData.password,
      newItemData.email,
      newItemData.position
    );
    const result = await controller.addUser(newItem);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const id = req.params.id;
      const user = await controller.getUserById(id);
      if (!user) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.json(user);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .put(async (req, res) => {
    try {
      const newItemData = req.body;
      const newItem = new User(
        newItemData.id,
        newItemData.name,
        newItemData.surname,
        newItemData.password,
        newItemData.email,
        newItemData.position
      );
      const result = await controller.updateUser(newItem);
      if (!result) {
        res.status(404).json({ error: "User not found" });
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
      const result = await controller.deleteUserById(id);
      if (!result) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.json(result);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post("/checkLogIn", async (req, res) => {
    try {
      const newItemData = req.body;
      const newItem = new User(
        newItemData.id,
        null,
        null,
        newItemData.password,
        null,
        null
      );
      const result = await controller.checkLogIn(newItem);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
module.exports = router;
