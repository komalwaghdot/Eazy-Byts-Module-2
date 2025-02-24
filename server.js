import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import stockRoutes from "./backend/routes/stocks.js";
import portfolioRoutes from "./backend/routes/portfolio.js";
const path = require("path");

// Load environment variables
dotenv.config();

// Define `app`
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use Routes
app.use("/api/stocks", stockRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

connectDB();

// Serve React frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

// Sample route for testing
app.get("/", (req, res) => {
  res.send("Portfolio API is working!");
});

// Protected route (only logged-in users can access)
app.get("/api/dashboard", authMiddleware, (req, res) => {
  res.json({ msg: `Welcome, user ${req.user.id}!` });
});

app.get("/api/details", (req, res) => {
  res.json({ message: "Stock details data will go here" });
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
