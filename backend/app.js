import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import auth_router from "./src/routes/auth.routes.js";
import aiRoutes from "./src/routes/ai.routes.js";

dotenv.config();

const app = express();

// Allowed origins check
const allowedOrigins = [
  "https://get-your-destination-n8cb.vercel.app",
  "https://get-your-destination-8qb3.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "http://localhost:4173",
  process.env.CLIENT_URL,
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, Postman)
      if (!origin) return callback(null, true);

      // Allow if explicit match or if it's any vercel preview/deployment domain
      if (
        allowedOrigins.includes(origin) ||
        /\.vercel\.app$/.test(origin)
      ) {
        return callback(null, true);
      }

      // In development, allow all origins
      if (process.env.NODE_ENV !== "production") {
        return callback(null, true);
      }

      return callback(null, true); // Permissive CORS for deployed clients
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health check route
app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "GetYourDestination API is running 🚀",
    timestamp: new Date().toISOString(),
  });
});

// App routes
app.use("/auth", auth_router);
app.use("/ai", aiRoutes);

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error("Global API Error:", err);
  const status = err.status || (err.name === "MulterError" ? 400 : 500);
  res.status(status).json({
    success: false,
    error: err.message || "Internal Server Error",
  });
});

export default app;

