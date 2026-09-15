import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Fast delay helper
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Get Gemini API key
// GEMINI_API_KEY is preferred, but GOOGLE_API_KEY is also supported.
function getApiKey() {
  return (
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    ""
  ).trim();
}

// Remove accidental markdown code fences from JSON response
function cleanJsonText(text = "") {
  return text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

// JSON schema for the AI response
const responseSchema = {
  type: Type.OBJECT,
  properties: {
    technicalQuestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: {
            type: Type.STRING,
          },
          intention: {
            type: Type.STRING,
          },
          answer: {
            type: Type.STRING,
          },
        },
        required: ["question", "intention", "answer"],
      },
    },

    behavioralQuestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: {
            type: Type.STRING,
          },
          intention: {
            type: Type.STRING,
          },
          answer: {
            type: Type.STRING,
          },
        },
        required: ["question", "intention", "answer"],
      },
    },

    skillsGap: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          skill: {
            type: Type.STRING,
          },
          recommendation: {
            type: Type.STRING,
          },
        },
        required: ["skill", "recommendation"],
      },
    },

    preparationPlan: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: {
            type: Type.STRING,
          },
          topics: {
            type: Type.STRING,
          },
          resources: {
            type: Type.STRING,
          },
        },
        required: ["day", "topics", "resources"],
      },
    },
  },

  required: [
    "technicalQuestions",
    "behavioralQuestions",
    "skillsGap",
    "preparationPlan",
  ],
};

export async function generateContent(
  resume,
  selfDescription,
  jobDescription
) {
  const apiKey = getApiKey();

  if (!apiKey) {
    throw new Error(
      "Google Gemini API key is missing. Please configure GEMINI_API_KEY or GOOGLE_API_KEY in Render environment variables."
    );
  }

  const ai = new GoogleGenAI({
    apiKey,
  });

  // Keep input sizes under control
  const cleanResume = String(resume || "").slice(0, 4000).trim();
  const cleanSelfDescription = String(selfDescription || "")
    .slice(0, 1500)
    .trim();
  const cleanJobDescription = String(jobDescription || "")
    .slice(0, 3500)
    .trim();

  const prompt = `
You are an executive interview intelligence and technical career coach.

Analyze the candidate's resume, self-description, and target job description.

Generate a high-quality interview preparation report tailored specifically to the candidate and target role.

Candidate Resume:
${cleanResume || "(Not provided)"}

Candidate Self Description:
${cleanSelfDescription || "(Not provided)"}

Target Job Description:
${cleanJobDescription || "(Not provided)"}

Return JSON using exactly this structure:

{
  "technicalQuestions": [
    {
      "question": "Sharp technical or architectural question tailored to the job",
      "intention": "What the interviewer is evaluating",
      "answer": "Concise high-scoring answer"
    }
  ],
  "behavioralQuestions": [
    {
      "question": "Targeted behavioral or leadership question",
      "intention": "Competency being evaluated",
      "answer": "High-impact STAR-style answer outline"
    }
  ],
  "skillsGap": [
    {
      "skill": "Missing or critical skill",
      "recommendation": "Concrete actionable recommendation"
    }
  ],
  "preparationPlan": [
    {
      "day": "Day 1",
      "topics": "Focus topic",
      "resources": "Practice/revision activity"
    }
  ]
}

Requirements:
- Exactly 3 technical questions.
- Exactly 3 behavioral questions.
- Exactly 3 or 4 skill gaps.
- Exactly 7 preparation-plan entries from Day 1 to Day 7.
- Keep answers concise but useful.
- Do not invent experience that is not present in the resume.
- Tailor questions to the target job description.
- Return JSON only.
- Do not return markdown.
- Do not use code fences.
`;

  const envModel = (process.env.GEMINI_MODEL || "").trim();

  /*
   * Current Gemini model candidates.
   *
   * GEMINI_MODEL on Render gets the highest priority.
   * If that model is unavailable, fallback models are tried.
   */
  const modelCandidates = [
    envModel,
    "gemini-3.8-flash",
    "gemini-3.7-flash",
    "gemini-3.6-flash",
    "gemini-3.5-flash",
  ].filter(Boolean);

  // Remove duplicate model names
  const uniqueModels = [...new Set(modelCandidates)];

  let lastError = null;

  for (const candidateModel of uniqueModels) {
    // Maximum 2 attempts for temporary errors
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        console.log(
          `[Gemini] Trying model ${candidateModel} - attempt ${attempt + 1
          }/2`
        );

        const response = await ai.models.generateContent({
          model: candidateModel,
          contents: prompt,

          config: {
            responseMimeType: "application/json",
            responseSchema,

            temperature: 0.2,

            maxOutputTokens: 4096,
          },
        });

        const text = cleanJsonText(response?.text || "");

        if (!text) {
          throw new Error(
            `Model ${candidateModel} returned an empty response.`
          );
        }

        // Normal JSON parse
        try {
          return JSON.parse(text);
        } catch (parseError) {
          /*
           * Defensive fallback:
           * If model accidentally adds text around JSON,
           * extract the outer JSON object.
           */
          const firstBrace = text.indexOf("{");
          const lastBrace = text.lastIndexOf("}");

          if (firstBrace !== -1 && lastBrace > firstBrace) {
            const extractedJson = text.slice(
              firstBrace,
              lastBrace + 1
            );

            return JSON.parse(extractedJson);
          }

          throw parseError;
        }
      } catch (err) {
        lastError = err;

        const status =
          err?.status ??
          err?.response?.status ??
          err?.code ??
          null;

        const message = String(err?.message || err || "");

        console.error(
          `[Gemini] Error from ${candidateModel}:`,
          message
        );

        // Model doesn't exist / is unavailable
        const isModelNotFound =
          status === 404 ||
          message.includes("404") ||
          message.toLowerCase().includes("not found") ||
          message.toLowerCase().includes("no longer available");

        if (isModelNotFound) {
          console.warn(
            `[Gemini] Model ${candidateModel} is unavailable. Trying next model...`
          );

          break;
        }

        // Rate-limit errors
        const isRateLimit =
          status === 429 ||
          message.includes("429") ||
          message.toLowerCase().includes("too many requests");

        // Temporary server errors
        const isTemporaryServiceError =
          status === 500 ||
          status === 502 ||
          status === 503 ||
          status === 504 ||
          message.includes("500") ||
          message.includes("502") ||
          message.includes("503") ||
          message.includes("504") ||
          message.toLowerCase().includes("service unavailable");

        /*
         * Retry only temporary errors once.
         */
        if (
          (isRateLimit || isTemporaryServiceError) &&
          attempt === 0
        ) {
          console.warn(
            `[Gemini] Temporary error on ${candidateModel}. Retrying in 1.5 seconds...`
          );

          await delay(1500);
          continue;
        }

        /*
         * API key / permission errors should not waste time
         * trying every model.
         */
        const isAuthError =
          status === 400 ||
          status === 401 ||
          status === 403 ||
          message.toLowerCase().includes("api key") ||
          message.toLowerCase().includes("permission denied");

        if (isAuthError) {
          throw new Error(
            `Gemini API authentication/permission error: ${message}`
          );
        }

        console.warn(
          `[Gemini] ${candidateModel} failed. Trying next model...`
        );

        break;
      }
    }
  }

  console.error(
    "[Gemini] All model candidates failed.",
    lastError?.message || lastError
  );

  throw new Error(
    lastError?.message ||
    "Failed to generate AI strategy. Please verify your Gemini API configuration."
  );
}

export default {
  generateContent,
}; v