const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  coinId: { type: mongoose.Schema.Types.ObjectId, ref: "Coin", required: true }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Subscription", SubscriptionSchema);