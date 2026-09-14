import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

import aiService from "../serivces/ai.service.js";
import InterviewReport from "../models/InterviewReport.js";

function sanitizeAiReport(rawReport) {
  const report = rawReport || {};

  // Extract technical questions
  const rawTech =
    report.technicalQuestions ||
    report.technical_questions ||
    report.technical ||
    [];
  const technicalQuestions = Array.isArray(rawTech)
    ? rawTech.map((q, idx) => ({
        question: String(
          q?.question || q?.q || `Technical Assessment Question ${idx + 1}`
        ).trim(),
        intention: String(
          q?.intention ||
            q?.focus ||
            q?.evaluation ||
            "Assess core technical competencies and system design depth"
        ).trim(),
        answer: String(
          q?.answer ||
            q?.response ||
            "Structure answer around principles, key trade-offs, and practical edge cases."
        ).trim(),
      }))
    : [];

  // Extract behavioral questions
  const rawBehav =
    report.behavioralQuestions ||
    report.behavioral_questions ||
    report.behavioral ||
    [];
  const behavioralQuestions = Array.isArray(rawBehav)
    ? rawBehav.map((q, idx) => ({
        question: String(
          q?.question || q?.q || `Behavioral Leadership Question ${idx + 1}`
        ).trim(),
        intention: String(
          q?.intention ||
            q?.competency ||
            "Evaluate leadership, ownership, conflict resolution, and communication"
        ).trim(),
        answer: String(
          q?.answer ||
            q?.response ||
            "Structure response using the STAR method: Situation, Task, Action, Result."
        ).trim(),
      }))
    : [];

  // Extract skills gap
  const rawGaps =
    report.skillsGap ||
    report.skillGaps ||
    report.skills_gap ||
    report.skill_gaps ||
    report.skills ||
    [];
  const skillsGap = Array.isArray(rawGaps)
    ? rawGaps.map((g, idx) => ({
        skill: String(
          g?.skill || g?.name || g?.title || `Competency Area ${idx + 1}`
        ).trim(),
        recommendation: String(
          g?.recommendation ||
            g?.advice ||
            g?.action ||
            "Review official documentation and build a hands-on proof-of-concept."
        ).trim(),
      }))
    : [];

  // Extract preparation plan
  const rawPlan =
    report.preparationPlan ||
    report.prepPlan ||
    report.preparation_plan ||
    report.plan ||
    [];
  const preparationPlan = Array.isArray(rawPlan)
    ? rawPlan.map((p, idx) => ({
        day: String(p?.day || `Day ${idx + 1}`).trim(),
        topic: String(
          p?.topic || p?.title || "Core Technical & Domain Knowledge"
        ).trim(),
        resources: String(
          p?.resources ||
            p?.resource ||
            p?.recommendations ||
            "Review core concepts, practice algorithmic problems, and build mock projects."
        ).trim(),
      }))
    : [];

  return {
    technicalQuestions,
    behavioralQuestions,
    skillsGap,
    preparationPlan,
  };
}

async function generateInterviewReport(req, res) {
  try {
    const userId = req.user?.id || req.user?._id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized: User session not found. Please log in again.",
      });
    }

    const { selfDescription, jobDescription } = req.body;

    // At least one of resume or selfDescription is required
    if (!req.file && !selfDescription) {
      return res.status(400).json({
        success: false,
        error: "Either a resume file or a self description is required.",
      });
    }

    if (!jobDescription || !jobDescription.trim()) {
      return res.status(400).json({
        success: false,
        error: "Job description is required.",
      });
    }

    // Safely parse resume if uploaded
    let resumeContent = "";
    if (req.file) {
      try {
        if (req.file.mimetype === "application/pdf") {
          const pdfData = await pdfParse(req.file.buffer);
          resumeContent = pdfData.text || "";
        } else {
          // Fallback text extraction for utf8 text
          resumeContent = req.file.buffer.toString("utf-8");
        }
      } catch (parseErr) {
        console.warn("Could not parse uploaded file buffer:", parseErr.message);
        // Do not crash the entire generation; proceed with available text or self description
        resumeContent = "";
      }
    }

    const rawAiReport = await aiService.generateContent({
      resume: resumeContent,
      selfDescription: selfDescription || "",
      jobDescription: jobDescription.trim(),
    });

    const sanitized = sanitizeAiReport(rawAiReport);

    const savedReport = await new InterviewReport({
      Description: jobDescription.trim(),
      resumeText: resumeContent.slice(0, 5000),
      selfDescription: (selfDescription || "").trim(),
      technicalQuestions: sanitized.technicalQuestions,
      behavioralQuestions: sanitized.behavioralQuestions,
      skillsGap: sanitized.skillsGap,
      preparationPlan: sanitized.preparationPlan,
      user: userId,
    }).save();

    return res.status(201).json({
      success: true,
      message: "Interview report generated successfully",
      report: savedReport,
    });
  } catch (error) {
    console.error("AI Controller Error:", error);
    return res.status(500).json({
      success: false,
      error:
        error.message ||
        "An unexpected error occurred while generating your interview report.",
    });
  }
}

async function getInterivewReportByUserId(req, res) {
  try {
    const { interviewId } = req.params;
    const interviewReport = await InterviewReport.findById(interviewId);

    if (!interviewReport) {
      return res.status(404).json({
        success: false,
        error: "Interview report not found",
      });
    }

    return res.status(200).json({
      message: "Interview report fetched successfully",
      success: true,
      report: interviewReport,
    });
  } catch (error) {
    console.error("getInterivewReportByUserId Error:", error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

/**
 * @desc controller to get all the interview reports by logged-in user
 */
async function getAllInterviewReportsByUserId(req, res) {
  try {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized",
      });
    }

    const interviewReports = await InterviewReport.find({ user: userId })
      .sort({ createdAt: -1 })
      .select(
        "-resumeText -__v -technicalQuestions.answer -behavioralQuestions.answer -skillsGap.reasoning"
      );

    return res.status(200).json({
      message: "Interview reports fetched successfully",
      success: true,
      reports: interviewReports,
    });
  } catch (error) {
    console.error("getAllInterviewReportsByUserId Error:", error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

export default {
  generateInterviewReport,
  getInterivewReportByUserId,
  getAllInterviewReportsByUserId,
};