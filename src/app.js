const express = require("express");
const cors = require("cors");

const coinRoutes = require("./routes/coinRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/coins", coinRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("🚀 Coin Tracker API is running!");
});

app.listen(3000, () => {
    console.log("Server is running on PORT: 3000");
});
