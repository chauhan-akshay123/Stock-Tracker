const express = require("express");
const { getAllCoins } = require("../controllers/coinController");

const router = express.Router();

router.get("/all", getAllCoins);

module.exports = router;