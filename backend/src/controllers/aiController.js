import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

import aiService from "../serivces/ai.service.js";
import InterviewReport from "../models/InterviewReport.js";

async function generateInterviewReport(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Resume file is required" });
    }

    const { selfDescription, jobDescription } = req.body;

    if (!selfDescription || !jobDescription) {
      return res.status(400).json({ error: "selfDescription and jobDescription are required" });
    }

    const pdfData = await pdfParse(req.file.buffer);
    const resumeContent = pdfData.text;

    const interviewReportByAi = await aiService.generateContent({
      resume: resumeContent,
      selfDescription,
      jobDescription
    }) || {};

    const savedReport = await new InterviewReport({
      Description: jobDescription,
      resumeText: resumeContent,
      selfDescription,
      technicalQuestions: interviewReportByAi.technicalQuestions || [],
      behavioralQuestions: interviewReportByAi.behavioralQuestions || [],
      skillsGap: interviewReportByAi.skillsGap || [],
      preparationPlan: interviewReportByAi.preparationPlan || [],
      user: req.user?.id,
    }).save();

    await savedReport.populate("user");

    res.status(201).json({
      success: true,
      message: "Interview report generated successfully",
      report: savedReport
    });

  } catch (error) {
    console.error("AI Controller Error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

export default { generateInterviewReport };