const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    coinId: { type: String, required: true }, // Store coin ID as a string
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
module.exports = Subscription;
