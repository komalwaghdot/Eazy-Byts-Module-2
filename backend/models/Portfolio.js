const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  stocks: [
    {
      symbol: { type: String, required: true },
      quantity: { type: Number, required: true },
      buyPrice: { type: Number, required: true },
    }
  ],
});

module.exports = mongoose.model("Portfolio", PortfolioSchema);
