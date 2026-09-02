import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://getyourdestination-1.onrender.com",
    withCredentials: true,
})
//  new code block add for :Fix: Axios interceptor add karo jo har request mein token attach kare
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const generateInterviewReport = async (userId, resume, selfDescription, jobDescription) => {
    const formData = new FormData() // Capital F! formData is a built in browser API

    // Check if resume exists before appending to avoid appending 'undefined'
    if (resume) {
        formData.append("resume", resume)


    }
    formData.append("selfDescription", selfDescription || "")
    formData.append("jobDescription", jobDescription || "")

    // The backend route defined in ai.routes.js is /generate (so /api/ai/generate)
    const response = await api.post(`/ai/generate`, formData);
    return response.data;

export const getAllInterviewReportsByUserId = async () => {
    const response = await api.get(`/ai/my-reports`);
    return response.data;
}

export const getInterviewReportById = async (interviewId) => {
    const response = await api.get(`/ai/${interviewId}`);
    return response.data;
}
