const { fetchAllCoins } = require("../services/coinService");

async function getAllCoins(req, res) {
    try{
     const coins = await fetchAllCoins();
     res.status(200).json({ success: true, data: coins });   
    } catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { getAllCoins };