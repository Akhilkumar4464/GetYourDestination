## A new project that comes into eyes 

## Setup

### Backend

1. Copy `.env.example` to `.env` and fill values:
   - `MONGODB_URI`: MongoDB connection (use MongoDB Atlas free tier)
   - `JWT_SECRET`: Any random string
   - `GOOGLE_API_KEY`: Gemini API key

2. Install deps: `cd backend && npm install`

3. Run dev server: `npm run dev`

### Gemini AI Setup (Fix for fetch error)
1. Get API key: https://aistudio.google.com/app/apikey
2. Enable **Generative Language API** in Google Cloud Console
3. Add billing account (required for production usage)
4. Add key to `.env`: `GOOGLE_API_KEY=AIza...`

Test: POST `/ai/generate` with JSON {resume, selfDescription, jobDescription}

### Frontend
cd frontend && npm install && npm run dev

