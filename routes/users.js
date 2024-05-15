const express = require("express");
const router = express.Router();
const controller = require("../controllers/usersController");
const jwt = require('jsonwebtoken');
const secretKey = "SecretKey123";
const session = require("express-session");
const User = require('../models/user');

const verifyToken = (req, res, next) => {
  
  const header = req.headers.authorization;
  if(!header || !header.startsWith("Bearer ")){
    console.log("NU");
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(400).json({ error: "Invalid token." });
  }
};

router.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000,
    },
  })
);

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

router.post("/getUserDataByEmail", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await controller.getUserByEmail(email, password);

    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      const token = jwt.sign({ id: user.id }, secretKey);
      req.session.user = { id: user.id, token: token };
      res.json({ user: user, token: token });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send({ error: "Logout failed." });
    } else {
      res.clearCookie("connect.sid");
      res.send({ message: "Logout successful." });
    }
  });
});

router.route("/:id")
  .get(verifyToken, async (req, res) => {
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
  .put(verifyToken, async (req, res) => {
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
  .delete(verifyToken, async (req, res) => {
    try {
      const id = req.params.id;
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

module.exports = router;
