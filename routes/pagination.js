const express = require("express");
const router = express.Router();
const controller = require("../controllers/paginationController");


router.get("/", async (req, res, next) => {
  try {
    const nrOfItems = parseInt(req.query.nr) || 10;
    const pageNr = parseInt(req.query.page) || 1;
    const data = await controller.getPagesOfNItems(nrOfItems, pageNr); 
    res.json(data); 
  } catch (error) {
    next(error); 
  }
});

module.exports = router;
