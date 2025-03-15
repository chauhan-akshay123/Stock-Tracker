const User = require("../models/User");
const Subscription = require("../models/Subscription");

// Subscribe to a coin
const subscribeToCoin = async (req, res) => {
    try{
      const user = await User.findById(req.user.id);
      const { coinId } = req.params;
      
      const existingSubscription = await Subscription.findOne({ user: user._id, coinId });
      if(existingSubscription) {
         return res.status(400).json({ message: "Already subscribed to this coin" });
      }
      
      const newSubscription = new Subscription({ user: user._id, coinId });
      await newSubscription.save();

      user.subscriptions.push(newSubscription._id);

      res.json({ message: `Subscribed to ${coinId}`, subscriptions: user.subscriptions });
    } catch(error){
        console.error("Error subscribing:", error);
        res.status(500).json({ error: "Subscription failed" });
    }
};

// Unsubscribe from a coin
const unsubscribeFromCoin = async (req, res) => {
    try{
      const user = await User.findById(req.user.id);
      const { coinId } = req.params;

      const subscription = await Subscription.findOneAndDelete({ user: user._id, coinId });
      if(!subscription) {
        return res.status(400).json({ message: "Subscription not found" }); 
      }

      user.subscriptions = user.subscriptions.filter(subId => subId.toString() !== subscription._id.toString());
      await user.save();

      res.json({ message: `Unsubscribed from ${coinId}`, subscriptions: user.subscriptions });
    } catch(error){
        console.error("Error unsubscribing:", error);
        res.status(500).json({ error: "Unsubscription Failed" });
    }
};

// Get user subscriptions
const getUserSubscriptions = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate({
            path: "subscriptions",
            populate: { path: "coinId" } // Populate coinId details if needed
        });

        res.json(user.subscriptions);
    } catch (error) {
        console.error("Error fetching subscriptions:", error);
        res.status(500).json({ error: "Failed to fetch subscriptions" });
    }
};

module.exports = { subscribeToCoin, unsubscribeFromCoin, getUserSubscriptions };