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
app.use(cors({
  origin: true, // reflects the requesting origin, allowing any localhost port
  credentials: true, // allow cookies
}));

// write all routes here
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.use("/auth", auth_router);
app.use("/ai", aiRoutes);
// Export app for server.js
export default app;
