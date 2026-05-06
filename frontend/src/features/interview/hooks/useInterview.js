import { 
    getAllInterviewReportsByUserId, 
    generateInterviewReport, 
    getInterviewReportById 
} from "../services/interview.api"
import { useContext } from "react"
import { InterviewContext } from "../interview.context"

export const useInterview = () => {
    const context = useContext(InterviewContext);
    
    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider");
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context;

    const generateReport = async ({ jobDescription, resume, resumeFile, selfDescription }) => {
        try {
            setLoading(true);
            const actualResume = resumeFile || resume;
            
            // interview.api.js expects (userId, resume, selfDescription, jobDescription)
            const response = await generateInterviewReport(null, actualResume, selfDescription, jobDescription);
            
            setReport(response?.report || response?.data || response);
            return response?.report || response?.data || response;
            
        } catch (error) {
            console.error("Error generating report:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const fetchReportsByUserId = async () => {
        try {
            setLoading(true);
            const response = await getAllInterviewReportsByUserId();
            setReports(response?.reports || response?.data || response);
            return response?.reports || response?.data || response;
        } catch (error) {
            console.error("Error fetching reports:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    // Changing this to point to our newly named getInterviewReportById
    const fetchReports = async (interviewId) => {
        try {
            setLoading(true);
            const response = await getInterviewReportById(interviewId);
            setReport(response?.report || response?.data || response);
            return response?.report || response?.data || response;
        } catch (error) {
            console.error("Error fetching reports:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return {
        loading, 
        generateReport, 
        fetchReportsByUserId, 
        fetchReports, 
        report, 
        reports
    }
}
