const express = require("express");
const { getAllCoins, getCoinById } = require("../controllers/coinController");

const router = express.Router();

router.get("/all", getAllCoins);
router.get("/:id", getCoinById);

module.exports = router;