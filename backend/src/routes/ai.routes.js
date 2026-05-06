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

/**
 * GET /api/ai/:interviewId
 * @desc get specific interview report
 * @access private
 */
router.get("/:interviewId", current_user, aiController.getInterivewReportByUserId);

/**
 * GET /api/ai/user/:userId
 * @desc get all interview reports for a specific user
 * @access private
 */
router.get("/user/:userId", current_user, aiController.getAllInterviewReportsByUserId);

export default router;
