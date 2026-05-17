# SkillBridge Platform - Architecture Guide

This document provides a comprehensive overview of the architecture for the SkillBridge (GetYourDestination) platform, detailing both the Frontend and Backend structures, their responsibilities, and how they interact.

## 1. System Overview

The platform is a MERN-stack web application designed to help users prepare for interviews by providing AI-driven interview simulations, resume generation, and performance tracking. 

- **Frontend**: React.js (Vite), SCSS for styling, Framer Motion for animations.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose ORM).
- **AI Integration**: Google Gemini AI (via `@google/genai` or `@google/generative-ai`) for parsing resumes and generating interview feedback.

---

## 2. Frontend Architecture

The frontend is built using a feature-based architecture to ensure scalability and maintainability.

### Directory Structure (`/frontend`)
```
frontend/
├── src/
│   ├── App.jsx               # Root component setting up providers
│   ├── app.routes.jsx        # Routing configuration (React Router)
│   ├── main.jsx              # React entry point
│   ├── index.css             # Global CSS and HSL variables
│   ├── components/           # Reusable, feature-agnostic components
│   │   └── common/           # e.g., Button, SEO, Modal
│   ├── features/             # Feature modules (Auth, Interview)
│   │   ├── Auth/             # Authentication feature (Login, Register)
│   │   │   ├── context/      # AuthContext for global user state
│   │   │   ├── hooks/        # useAuth hook
│   │   │   ├── pages/        # Login.jsx, Register.jsx
│   │   │   └── services/     # API calls for auth
│   │   └── interview/        # Interview generation and history
│   │       ├── context/      # Interview state management
│   │       ├── hooks/        # Custom hooks for interview logic
│   │       ├── pages/        # Home.jsx (Dashboard), Interview.jsx (Report)
│   │       ├── services/     # API calls for interview/resume handling
│   │       └── styles/       # Specific SCSS modules for interview pages
│   └── styles/               # Global SCSS styles (if any)
```

### Key Concepts

- **Feature-Based Routing**: Each major domain of the application (e.g., Auth, Interview) is encapsulated in its own folder under `src/features/`. This keeps related UI, logic, and styles tightly coupled and easily readable.
- **Context API for State Management**: 
  - `AuthContext`: Manages the logged-in user state and authentication tokens.
  - `InterviewContext`: Manages the state of generated interview reports and current active sessions.
- **Protected Routes**: The React Router setup includes a wrapper for protected routes to ensure that only authenticated users can access the dashboard and interview pages.
- **Styling**: SCSS is used for component-specific styling, while global theme variables (colors defined in HSL format for dynamic theming) are stored in `index.css`.
- **Animations**: `framer-motion` is utilized for smooth page transitions and micro-interactions.

---

## 3. Backend Architecture

The backend follows a layered MVC (Model-View-Controller) architecture, though modified for API responses (Model-Route-Controller-Service).

### Directory Structure (`/backend`)
```
backend/
├── server.js                 # HTTP Server initialization
├── app.js                    # Express app configuration (Middleware, CORS, Routes)
├── src/
│   ├── config/               # Database connection and environment configurations
│   ├── controllers/          # Request handlers (logic for endpoints)
│   │   ├── auth.controller.js
│   │   └── aiController.js
│   ├── middleware/           # Custom Express middlewares
│   │   ├── authMiddleware.js # JWT verification
│   │   └── multer.js         # File upload handling (for resumes)
│   ├── models/               # Mongoose schemas
│   │   ├── User.model.js
│   │   ├── InterviewReport.js
│   │   └── Blacklist.model.js
│   ├── routes/               # API route definitions
│   │   ├── auth.routes.js
│   │   └── ai.routes.js
│   └── serivces/             # Core business logic and external API integrations
│       ├── ai.service.js     # Interaction with Google Gemini AI
│       └── Temp.js           # (Any auxiliary or experimental services)
```

### Key Concepts

- **Layered Architecture**:
  - **Routes**: Define the API endpoints and map them to specific controllers.
  - **Controllers**: Handle HTTP request/response parsing, validate input, and call the appropriate services.
  - **Services**: Contain the core business logic (e.g., parsing a resume, prompt engineering for Gemini AI). This decouples logic from HTTP specifics, making it reusable.
  - **Models**: Define the MongoDB schema and handle database interactions using Mongoose.
- **Authentication**: JWT (JSON Web Tokens) are used for stateless authentication. Passwords are encrypted using `bcrypt`. A blacklist model is maintained to invalidate tokens upon logout.
- **File Handling**: `multer` middleware is configured in the backend to receive `multipart/form-data` uploads (resumes) from the frontend, storing them temporarily in memory or on disk before processing them via the AI service.

---

## 4. System Flow: AI Interview Generation

To understand the architecture in action, here is the flow for the core feature: Generating an AI Interview Report.

1. **User Action**: The user selects a resume (PDF/DOCX) and enters a job description on the Frontend (`Home.jsx`).
2. **Frontend Request**: The `interview.api.js` service sends a `multipart/form-data` POST request to `/api/ai/generate-interview`.
3. **Backend Routing & Middleware**:
   - The route is protected by `authMiddleware` (verifies JWT).
   - The `multer` middleware intercepts the request and parses the file.
4. **Controller Processing**: `aiController.js` receives the file and job description, then passes them to `ai.service.js`.
5. **AI Service Execution**:
   - The file is parsed (e.g., using `pdf-parse`).
   - A structured prompt is assembled combining the user's resume content and the job description.
   - The prompt is sent to the Google Gemini AI model.
   - The AI responds with structured JSON data containing interview feedback, strengths, weaknesses, and a tailored resume.
6. **Database Persistence**: The generated data is saved to MongoDB via the `InterviewReport` model, linked to the user's ID.
7. **Response & UI Update**: 
   - The backend responds with the saved report ID.
   - The frontend's `InterviewContext` updates, and the user is navigated to `/interview/:id` to view the comprehensive report (`Interview.jsx`).

---

## 5. Deployment Considerations

- **Environment Variables**:
  - Frontend: `VITE_API_URL` (points to the backend server).
  - Backend: `PORT`, `MONGO_URI`, `JWT_SECRET`, `GEMINI_API_KEY`, `FRONTEND_URL` (for CORS).
- **CORS**: Configured in `app.js` to only allow requests from the specified `FRONTEND_URL`.
- **Database**: Ensure the MongoDB instance is whitelisted and running.
