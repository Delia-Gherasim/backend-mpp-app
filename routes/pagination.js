const express = require("express");
const router = express.Router();
const controller = require("../controllers/paginationController");

router.get("/", (req, res) => {
  const nrOfItems = req.query.nr || 10; 
  const pageNr = req.query.page || 1;
  res.send(controller.getPagesOfNItems(nrOfItems, pageNr));
});

module.exports = router;
