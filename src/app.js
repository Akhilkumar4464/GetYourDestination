import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// middleware
app.use(express.json());

// route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// DB connect + server start
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🔥 Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.log("❌ Server failed to start:", error);
  }
};

startServer();