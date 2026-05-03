import app from "./app.js";
import connectDB from "./src/config/database.js";
import dotenv from "dotenv";
import aiService from "./src/serivces/ai.service.js";
// const { resume, selfDescription, jobDescription } = req.body;
dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to database
    await connectDB();
    console.log("✅ Database connected successfully");

    // Initialize AI service
//     await aiService.invokeAI();
//     console.log("✅ AI service initialized");

//     // Generate AI content based on resume, self description, and job description
// await aiService.generateContent({ resume, selfDescription, jobDiscription });
//     console.log("✅ AI content generated successfully");

    // Start the server
    app.listen(PORT, () => {
      console.log(`🔥 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error);
    process.exit(1);
  }
};

startServer();
