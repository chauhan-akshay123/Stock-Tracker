const mongoose = require("mongoose");

const CoinSchema = new mongoose.Schema({
 coinGeckoId: { type: String, required: true, unique: true },
 symbol: { type: String, required: true },
 name: { type: String, required: true },
 image: { type: String },
},
{
    timestamps: true
}
);

modul.exports = mongoose.model("Coin", CoinSchema);