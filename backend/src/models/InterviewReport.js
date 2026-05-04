import mongoose from "mongoose";

const { Schema } = mongoose;

/* ================================
   SUB SCHEMAS
================================ */

// Technical Questions
const technicalQuestionSchema = new Schema({
  question: {
    type: String,
    required: [true, "Technical question is required"],
    trim: true,
  },
  intention: {
    type: String,
    required: [true, "Technical question intention is required"],
    trim: true,
  },
  answer: {
    type: String,
    default: "Answer not provided",
    trim: true,
  },
}, { _id: false });


// Behavioral Questions
const behavioralQuestionSchema = new Schema({
  question: {
    type: String,
    required: [true, "Behavioral question is required"],
    trim: true,
  },
  intention: {
    type: String,
    required: [true, "Behavioral question intention is required"],
    trim: true,
  },
  answer: {
    type: String,
    default: "Use STAR method",
    trim: true,
  },
}, { _id: false });


// Skill Gap
const skillGapSchema = new Schema({
  skill: {
    type: String,
    required: [true, "Skill is required"],
    trim: true,
  },
  recommendation: {
    type: String,
    required: [true, "Skill gap recommendation is required"],
    trim: true,
  },
}, { _id: false });


// Preparation Plan
const preparationPlanSchema = new Schema({
  day: {
    type: String,
    required: [true, "Preparation plan day is required"],
  },
  topic: {
    type: String,
    required: [true, "Preparation plan topic is required"],
    default: "General improvement",
  },
  resources: {
    type: String,
    required: [true, "Preparation plan resources is required"],
    default: "Practice and revise",
  },
}, { _id: false });


// Main Interview Report Schema

const interviewReportSchema = new Schema({
  Description: {
    type: String,
    required: [true, "Job description is required"],
    trim: true,
  },

  resumeText: {
    type: String,
    default: "",
  },

  selfDescription: {
    type: String,
    required: [true, "Self description is required"],
    trim: true,
  },

  score: {
    technical: { type: Number, min: 0, max: 100, default: 0 },
    behavioral: { type: Number, min: 0, max: 100, default: 0 },
    overall: { type: Number, min: 0, max: 100, default: 0 },
  },

  technicalQuestions: {
    type: [technicalQuestionSchema],
    default: [],
  },

  behavioralQuestions: {
    type: [behavioralQuestionSchema],
    default: [],
  },

  skillsGap: {
    type: [skillGapSchema],
    default: [],
  },

  preparationPlan: {
    type: [preparationPlanSchema],
    default: [],
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },

}, { timestamps: true });





const InterviewReport = mongoose.model("InterviewReport", interviewReportSchema);

export default InterviewReport;