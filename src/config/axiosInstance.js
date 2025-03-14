const axios = require("axios");
require("dotenv").config();

const axiosInstance = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "x-cg-demo-api-key": process.env.COIN_GECKO_API_KEY,
  },
});

module.exports = axiosInstance;