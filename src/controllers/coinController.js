const { fetchAllCoins, fetchCoinById } = require("../services/coinService");

async function getAllCoins(req, res) {
    try{
     const coins = await fetchAllCoins();
     res.status(200).json({ success: true, data: coins });   
    } catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
}

const getCoinById = async (req, res) => {
    try{
      const { id } = req.params;
      const coin = await fetchCoinById(id);
      res.status(200).json({ success: true, data: coin });
    } catch(error){
        res.status(500).json({ success: false, message: error.message }); 
    }
}

module.exports = { getAllCoins, getCoinById };