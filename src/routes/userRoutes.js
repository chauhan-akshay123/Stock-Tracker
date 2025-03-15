 const express = require("express");
 const { subscribeToCoin, unsubscribeFromCoin, getUserSubscriptions } = require("../controllers/userController");
 const authMiddleware = require("../middlewares/auth");

 const router = express.Router();

 // Subscribe to a coin
 router.post("/subscriptions/:coinId", authMiddleware, subscribeToCoin);

 // Unsubscribe from a coin
 router.post("/unsubscribe/:coinId", authMiddleware, unsubscribeFromCoin);

 // Get user subscriptions
 router.get("/subscriptions", authMiddleware, getUserSubscriptions);

 module.exports = router;