import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://getyourdestination-1.onrender.com",
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const generateInterviewReport = async (userId, resume, selfDescription, jobDescription) => {
    const formData = new FormData();

    if (resume) {
        formData.append("resume", resume);
    }
    formData.append("selfDescription", selfDescription || "");
    formData.append("jobDescription", jobDescription || "");

    const response = await api.post(`/ai/generate`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return response.data;
};

export const getAllInterviewReportsByUserId = async () => {
    const response = await api.get(`/ai/my-reports`);
    return response.data;
};

export const getInterviewReportById = async (interviewId) => {
    const response = await api.get(`/ai/${interviewId}`);
    return response.data;
};
