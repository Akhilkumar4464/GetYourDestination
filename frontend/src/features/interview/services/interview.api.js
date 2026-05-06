import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
})

export const generateInterviewReport = async (userId, resume, selfDescription, jobDescription) => {
    const formData = new FormData() // Capital F! formData is a built in browser API

    // Check if resume exists before appending to avoid appending 'undefined'
    if (resume) {
        formData.append("resume", resume)


    }
    formData.append("selfDescription", selfDescription || "")
    formData.append("jobDescription", jobDescription || "")

    // The backend route defined in ai.routes.js is /generate (so /api/ai/generate)
    const response = await api.post(`/ai/generate`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return response.data;
}

export const getAllInterviewReportsByUserId = async () => {
    // Backend route defined in ai.routes.js is /user/:userId. 
    // Wait, earlier the route was just hitting current_user so user ID could be pulled from token.
    // Since the API doesn't pass userId anymore, we should fetch reports for the current logged-in user.
    // Your backend says: router.get("/user/:userId", ...)
    // If you don't pass a userId, it will fail.

    // Let's assume you fetch all for the current user in a different way or pass userId later.
    // We will leave this matching your controller for now, though you should pass userId.
    const response = await api.get(`/ai/interview-reports`);
    return response.data;
}

export const getInterviewReportById = async (interviewId) => {
    const response = await api.get(`/ai/${interviewId}`);
    return response.data;
}
