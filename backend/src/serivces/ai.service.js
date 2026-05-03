import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import z from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import fetch from "node-fetch";
dotenv.config();


// Polyfill fetch for Node.js environment
global.fetch = fetch;




// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
 console.log( process.env.GOOGLE_API_KEY);
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
      err?.message?.includes("Too Many Requests");

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
    model: "gemini-2.5-flash",
  });

 const prompt = `
You are an expert interviewer.

Return ONLY valid JSON in this exact format:

{
  "technicalQuestions": [
    {
      "question": "",
      "intention": "",
      "answer": ""
    }
  ],
  "behavioralQuestions": [
    {
      "question": "",
      "intention": "",
      "answer": ""
    }
  ],
"skillsGap": [
    {
      "skill": "",
      "recommendation": ""
    }
  ],
"preparationPlan": [
    {
      "day": "",
      "topic": "",
      "resources": ""
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
  const cleanText = text.replace(/```json|```/g, "").trim();
  //  console.log("Raw AI Response:", text);
  //  console.log("Cleaned AI Response:", cleanText);
  return JSON.parse(cleanText);

}

export default {
  generateContent,
};
