import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/database.js";
import auth_router from "./src/routes/auth.routes.js";
import cookieParser from "cookie-parser";
import aiRoutes from "./src/routes/ai.routes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cookieParser());

// middleware
app.use(express.json());
// backend/app.js line 16 update:
app.use(cors({
  origin: [
    "https://get-your-destination-n8cb.vercel.app",
    "https://get-your-destination-8qb3.vercel.app", // Ye wala error mein dikh raha hai
    "http://localhost:5173"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));



// write all routes here
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.use("/auth", auth_router);
app.use("/ai", aiRoutes);
// Export app for server.js
export default app;
