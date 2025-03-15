const axiosInstance = require("../config/axiosInstance");

async function fetchAllCoins(){
    try{
        const response = await axiosInstance.get(`/coins/markets`, {
            params: {
              vs_currency: "usd", 
              order: "market_cap_desc", // Sort by market cap
              per_page: 100, // Number of coins per page
              page: 1, // First page of results
              price_change_percentage: "1h,24h,7d", // Include price change % for different timeframes
              sparkline: false, // Don't include sparkline data (optional)
            },
          });
      return response.data;
    } catch(error){
        throw new Error("Failed to fetch coins from CoinGecko");
    }
}

async function fetchCoinById(id) {
  try {
    const response = await axiosInstance.get(`/coins/${id}`, {
      params: {
        localization: false,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch a coin by ID");
  }
}

module.exports = { fetchAllCoins, fetchCoinById };