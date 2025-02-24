const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/latest", async (req, res) => {
  try {
    const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
      params: { vs_currency: "usd", order: "market_cap_desc", per_page: 10 }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
});

module.exports = router;
