import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
if (!process.env.GOOGLE_API_KEY) {
  console.warn("⚠️  GOOGLE_API_KEY is not set in environment variables");
}

// Fast retry delay
function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

// Resilient fast generation
async function safeGenerate(model, prompt, retries = 2) {
  try {
    return await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.2,
        maxOutputTokens: 2048,
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
    });
  } catch (err) {
    const isRateLimit =
      err?.message?.includes("429") ||
      err?.message?.includes("Too Many Requests") ||
      err?.message?.includes("503") ||
      err?.message?.includes("Service Unavailable");

    if (isRateLimit && retries > 0) {
      console.log("⏳ Fast retry after brief delay...");
      await delay(500);
      return safeGenerate(model, prompt, retries - 1);
    }

    console.error("AI Generation Error:", err.message);
    throw err;
  }
}

/**
 * Main Report Generation Service
 * Highly optimized for 3-5 second response times with Gemini 2.5 Flash
 */
export async function generateContent({ resume, selfDescription, jobDescription }) {
  // Pre-trim input text to eliminate prompt ingestion latency
  const cleanResume = (resume || "").slice(0, 4000).trim();
  const cleanSelfDesc = (selfDescription || "").slice(0, 1500).trim();
  const cleanJobDesc = (jobDescription || "").slice(0, 3500).trim();

  const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const model = genAI.getGenerativeModel({
    model: modelName,
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.2,
      maxOutputTokens: 2048,
      thinkingConfig: {
        thinkingBudget: 0,
      },
    },
  });

  const prompt = `You are an elite executive interviewer and technical career coach.
Analyze the target job description and candidate background, then output a high-precision interview strategy report.

Output strictly valid JSON matching this exact structure:
{
  "technicalQuestions": [
    {
      "question": "Sharp technical or architectural question tailored to the job requirements",
      "intention": "What hiring managers evaluate with this question",
      "answer": "Concise high-scoring answer highlighting key principles and trade-offs"
    }
  ],
  "behavioralQuestions": [
    {
      "question": "Targeted behavioral leadership/collaboration question",
      "intention": "Competency tested (e.g., Conflict Resolution, Ownership)",
      "answer": "High-impact response outline structured with Situation, Task, Action, Result (STAR)"
    }
  ],
  "skillsGap": [
    {
      "skill": "Specific missing or critical skill required by the JD",
      "recommendation": "Concrete actionable step to master or demonstrate this skill"
    }
  ],
  "preparationPlan": [
    {
      "day": "Day 1",
      "topic": "Core focus topic for this day",
      "resources": "High-yield concept, practice exercise, or revision item"
    }
  ]
}

Guidelines for high speed and maximum quality:
- Generate exactly 3 technical questions.
- Generate exactly 3 behavioral questions.
- Generate exactly 3-4 key skill gaps.
- Generate a 7-day preparation plan (Day 1 through Day 7) with 1 concise actionable topic per day.
- Keep answers crisp, structured, and informative. No conversational preamble.

Candidate Resume:
${cleanResume || "Not provided (refer to self description)"}

Candidate Self Description:
${cleanSelfDesc || "Not provided (refer to resume)"}

Target Job Description:
${cleanJobDesc}`;

  const result = await safeGenerate(model, prompt);
  const response = await result.response;
  const text = response.text();
  const cleanText = text.replace(/^```json\s*|```$/g, "").trim();

  try {
    return JSON.parse(cleanText);
  } catch (parseError) {
    console.error("AI response parse error. Raw text was:", cleanText.slice(0, 300));
    // Fallback: search for JSON object boundary
    const firstBrace = cleanText.indexOf("{");
    const lastBrace = cleanText.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      return JSON.parse(cleanText.substring(firstBrace, lastBrace + 1));
    }
    throw new Error("AI returned an invalid response format. Please try again.");
  }
}

export default {
  generateContent,
};

