import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

import aiService from "../serivces/ai.service.js";
import InterviewReport from "../models/InterviewReport.js";

async function generateInterviewReport(req, res) {
  try {
    const { selfDescription, jobDescription } = req.body;

    // At least one of resume or selfDescription is required
    if (!req.file && !selfDescription) {
      return res.status(400).json({ error: "Either a resume file or a self description is required" });
    }

    if (!jobDescription) {
      return res.status(400).json({ error: "jobDescription is required" });
    }

    // Only parse PDF if a file was uploaded
    let resumeContent = "";
    if (req.file) {
      const pdfData = await pdfParse(req.file.buffer);
      resumeContent = pdfData.text;
    }

    const interviewReportByAi = await aiService.generateContent({
      resume: resumeContent,
      selfDescription: selfDescription || "",
      jobDescription
    }) || {};

    const savedReport = await new InterviewReport({
      Description: jobDescription,
      resumeText: resumeContent,
      selfDescription: selfDescription || "",
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
    console.error("AI Controller Error:", error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

async function getInterivewReportByUserId(req, res) {
  const { interviewId } = req.params;

  const interviewReport = await InterviewReport.findById(interviewId);

  if (!interviewReport) {
    return res.status(404).json({ error: "Interview report not found" });
  }

  res.status(200).json({
    message: "Interview report fetched successfully",
    success: true,
    report: interviewReport
  })


}

/**
 * @desc controller to  all the interview reports by logined user
 * 
 * 
 */
async function getAllInterviewReportsByUserId(req, res) {
  try {
    // Use the user id from the JWT decoded by current_user middleware
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const interviewReports = await InterviewReport
      .find({ user: userId })
      .sort({ createdAt: -1 })
      .select("-resumeText -__v -technicalQuestions.answer -behavioralQuestions.answer -skillsGap.reasoning");

    res.status(200).json({
      message: "Interview reports fetched successfully",
      success: true,
      reports: interviewReports
    });
  } catch (error) {
    console.error("getAllInterviewReportsByUserId Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
}

export default { generateInterviewReport, getInterivewReportByUserId, getAllInterviewReportsByUserId };