# SkillBridge (GetYourDestination)

Welcome to the SkillBridge platform! SkillBridge is an AI-powered interview simulation and preparation tool designed to give you a competitive edge.

## Project Structure

This project is a full-stack MERN application divided into two main workspaces:

- [`/frontend`](./frontend/README.md) - The React.js frontend built with Vite.
- `/backend` - The Node.js and Express backend server.

## Architecture

For a comprehensive guide on the system design, directory structures, and data flow (including the AI integration), please read the **[Architecture Guide](./ARCHITECTURE.md)**.

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB

### Running Locally

1. **Backend**:
   ```bash
   cd backend
   npm install
   # Create a .env file from .env.example
   npm run dev
   ```

2. **Frontend**:
   ```bash
   cd frontend
   npm install
   # Ensure .env is set up correctly (pointing to the local backend)
   npm run dev
   ```
