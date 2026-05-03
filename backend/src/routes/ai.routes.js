import express from "express";
import aiService from "../serivces/ai.service.js";
import { current_user } from "../middleware/auth.middleware.js";
import aiController from "../controllers/aiController.js";
import { upload } from "../middleware/file.middleware.js";
const router = express.Router();




/**
 * POST /api/ai/generate
 * @desc generate interview report based on resume, self description, and job description
 * @access private
 */

router.post("/generate", current_user, upload.single('resume'), aiController.generateInterviewReport);


export default router;
