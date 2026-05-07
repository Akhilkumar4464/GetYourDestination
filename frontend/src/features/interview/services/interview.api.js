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
    const response = await api.get(`/ai/my-reports`);
    return response.data;
}

export const getInterviewReportById = async (interviewId) => {
    const response = await api.get(`/ai/${interviewId}`);
    return response.data;
}
