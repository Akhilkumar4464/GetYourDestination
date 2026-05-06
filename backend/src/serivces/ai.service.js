import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
if (!process.env.GOOGLE_API_KEY) {
  console.warn("⚠️  GOOGLE_API_KEY is not set in environment variables");
}
// delay
function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

// retry logic
async function safeGenerate(model, prompt, retries = 3) {
  try {
    return await model.generateContent(prompt);
  } catch (err) {
    const isRateLimit =
      err?.message?.includes("429") ||
      err?.message?.includes("Too Many Requests") ||
      err?.message?.includes("503") ||
      err?.message?.includes("Service Unavailable");

    if (isRateLimit && retries > 0) {
      console.log("⏳ Retry after delay...");
      await delay(5000);
      return safeGenerate(model, prompt, retries - 1);
    }

    console.error("Final Error:", err.message);
    throw err;
  }
}

// main function
export async function generateContent({ resume, selfDescription, jobDescription }) {
  const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
  });

  const prompt = `
You are an expert interviewer.

Return ONLY valid JSON in this exact format:

{
  "technicalQuestions": [
    {
      "question": "generate a relevant technical question",
      "intention": "what this question tests",
      "answer": "ideal sample answer"
    }
  ],
  "behavioralQuestions": [
    {
      "question": "generate a relevant behavioral question",
      "intention": "what this question tests",
      "answer": "ideal sample answer using STAR method"
    }
  ],
"skillsGap": [
    {
      "skill": "skill name",
      "recommendation": "how to improve this skill"
    }
  ],
"preparationPlan": [
    {
      "day": "Day 1",
      "topic": "topic to study",
      "resources": "resources or actions to take"
    }
  ]
}

No explanation. No markdown.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

  const result = await safeGenerate(model, prompt);
  const response = await result.response;
  const text = response.text();
  const cleanText = text.replace(/```json\s*|```/g, "").trim();

  try {
    return JSON.parse(cleanText);
  } catch (parseError) {
    console.error("AI response was not valid JSON:", cleanText.slice(0, 200));
    throw new Error("AI returned an invalid response. Please try again.");
  }

}

export default {
  generateContent,
};
