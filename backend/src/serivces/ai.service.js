import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

// Fast delay helper
function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

// Helper to get configured Google/Gemini API key
function getApiKey() {
  return (
    process.env.GOOGLE_API_KEY ||
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_GENAI_API_KEY ||
    ""
  ).trim();
}

/**
 * Robust AI content generation with automatic model fallback & rate-limit retries
 */
export async function generateContent({ resume, selfDescription, jobDescription }) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error(
      "Google Gemini API Key is missing. Please configure GOOGLE_API_KEY or GEMINI_API_KEY in your deployment environment variables."
    );
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  // Pre-trim input text
  const cleanResume = (resume || "").slice(0, 4000).trim();
  const cleanSelfDesc = (selfDescription || "").slice(0, 1500).trim();
  const cleanJobDesc = (jobDescription || "").slice(0, 3500).trim();

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

  // Candidate models in priority order.
  // Note: "gemini-2.5-flash" does not exist; we filter it out if set in env.
  const envModel = (process.env.GEMINI_MODEL || "").trim();
  const validEnvModel =
    envModel && envModel !== "gemini-2.5-flash" ? envModel : null;

  const modelCandidates = [
    validEnvModel,
    "gemini-1.5-flash",
    "gemini-2.0-flash",
    "gemini-1.5-pro",
    "gemini-2.0-flash-lite"
  ].filter(Boolean);

  // Remove duplicates
  const uniqueModels = [...new Set(modelCandidates)];

  let lastError = null;

  for (const candidateModel of uniqueModels) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const model = genAI.getGenerativeModel({
          model: candidateModel,
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.2,
            maxOutputTokens: 2048,
          },
        });

        const result = await model.generateContent({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
        });

        const response = await result.response;
        const text = response.text();
        const cleanText = text.replace(/^```json\s*|```$/g, "").trim();

        try {
          return JSON.parse(cleanText);
        } catch (parseErr) {
          const firstBrace = cleanText.indexOf("{");
          const lastBrace = cleanText.lastIndexOf("}");
          if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
            return JSON.parse(cleanText.substring(firstBrace, lastBrace + 1));
          }
          throw parseErr;
        }
      } catch (err) {
        lastError = err;
        const isRateLimit =
          err?.message?.includes("429") ||
          err?.message?.includes("Too Many Requests") ||
          err?.message?.includes("503") ||
          err?.message?.includes("Service Unavailable");

        if (isRateLimit && attempt === 0) {
          console.warn(`⏳ Rate limited on model ${candidateModel}, waiting 1s...`);
          await delay(1000);
          continue; // retry same model once
        }

        console.warn(`⚠️ Model ${candidateModel} failed: ${err.message}. Trying next candidate...`);
        break; // break inner loop and try next model
      }
    }
  }

  console.error("All Gemini model candidates failed. Last error:", lastError?.message);
  throw new Error(
    lastError?.message || "Failed to generate AI strategy. Please verify your Gemini API key."
  );
}

export default {
  generateContent,
};


