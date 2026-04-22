import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();    
const MONGODB_URI = process.env.MONGODB_URI;

export default async function connectDB() {
    try {
        if (!MONGODB_URI) {
            console.error("MongoDB connection string is not defined in environment variables.");
            process.exit(1); // Stop execution if URI is missing
        }
        await mongoose.connect(MONGODB_URI);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Stop execution if connection fails
    }   
}