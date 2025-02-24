const express = require("express");
const router = express.Router();
const Portfolio = require("../models/Portfolio");


// Get User Portfolio
router.get("/:userId", async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.params.userId });
    res.json(portfolio || { stocks: [] });
  } catch (error) {
    res.status(500).json({ error: "Error fetching portfolio" });
  }
});

// Buy Stock
router.post("/buy", async (req, res) => {
  const { userId, symbol, quantity, buyPrice } = req.body;

  try {
    let portfolio = await Portfolio.findOne({ userId });

    if (!portfolio) {
      portfolio = new Portfolio({ userId, stocks: [] });
    }

    // Check if stock already exists in the portfolio
    const existingStock = portfolio.stocks.find(stock => stock.symbol === symbol);

    if (existingStock) {
      existingStock.quantity += quantity;
    } else {
      portfolio.stocks.push({ symbol, quantity, buyPrice });
    }

    await portfolio.save();
    res.json({ message: "Stock purchased successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error buying stock" });
  }
});

// Sell Stock
router.post("/sell", async (req, res) => {
  const { userId, symbol, quantity } = req.body;

  try {
    let portfolio = await Portfolio.findOne({ userId });

    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio not found" });
    }

    const stockIndex = portfolio.stocks.findIndex(stock => stock.symbol === symbol);

    if (stockIndex === -1) {
      return res.status(400).json({ error: "Stock not found in portfolio" });
    }

    if (portfolio.stocks[stockIndex].quantity < quantity) {
      return res.status(400).json({ error: "Not enough stock to sell" });
    }

    portfolio.stocks[stockIndex].quantity -= quantity;

    if (portfolio.stocks[stockIndex].quantity === 0) {
      portfolio.stocks.splice(stockIndex, 1);
    }

    await portfolio.save();
    res.json({ message: "Stock sold successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error selling stock" });
  }
});

module.exports = router;
