import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Home.scss";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/hooks/useAuth";
import Button from "../../../components/common/Button";
import SEO from "../../../components/common/SEO";

export default function Home() {
    const { loading, generateReport, reports, fetchReportsByUserId } = useInterview();
    const { user, handleLogout } = useAuth();
    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const [resumeFile, setResumeFile] = useState(null);
    const [reportsLoading, setReportsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadReports = async () => {
            try {
                await fetchReportsByUserId();
            } catch (err) {
                console.error("Failed to load reports:", err);
            } finally {
                setReportsLoading(false);
            }
        };
        loadReports();
    }, []);

    const handleGenerateReport = async () => {
        try {
            const data = await generateReport({
                jobDescription,
                resume: resumeFile,
                selfDescription
            });

            if (data?.report?._id) {
                navigate(`/interview/${data.report._id}`);
            } else if (data?._id) {
                navigate(`/interview/${data._id}`);
            }
        } catch (error) {
            console.error("Report generation failed:", error);
        }
    };

    const trimDescription = (text, maxLen = 90) => {
        if (!text) return "No description provided";
        return text.length > maxLen ? text.slice(0, maxLen).trimEnd() + "…" : text;
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <motion.main 
            className="home container"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <SEO title="Dashboard" />
            
            <motion.div className="user-profile" variants={itemVariants}>
                <div className="user-info">
                    <div className="user-avatar">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="user-details">
                        <span className="user-name">{user?.name || "User"}</span>
                        <span className="user-email">{user?.email}</span>
                    </div>
                </div>
                <div className="logout-btn-wrapper">
                    <Button 
                        variant="ghost" 
                        onClick={handleLogout} 
                        className="logout-btn"
                        icon={() => (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                            </svg>
                        )}
                    >
                        Logout
                    </Button>
                </div>
            </motion.div>

            <motion.div className="page-header" variants={itemVariants}>
                <h1>Target Your <span>Next Career Destination</span></h1>
                <p>Upload your resume and paste the job description to get an AI-powered interview preparation strategy tailored just for you.</p>
            </motion.div>

            <motion.div className="main-card" variants={itemVariants}>
                <div className="card-content">
                    <div className="left-panel">
                        <div className="section-header">
                            <div className="header-title">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="icon">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                                </svg>
                                <h2>Job Description</h2>
                            </div>
                            <span className="badge badge-required">Required</span>
                        </div>
                        <div className="textarea-wrapper">
                            <textarea
                                onChange={(e) => setJobDescription(e.target.value)}
                                value={jobDescription}
                                placeholder="Paste the job description here..."
                                maxLength={5000}
                            ></textarea>
                            <span className="char-count">{jobDescription.length}/5000</span>
                        </div>
                    </div>

                    <div className="right-panel">
                        <div className="section-header">
                            <div className="header-title">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="icon">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                                <h2>Your Profile</h2>
                            </div>
                        </div>

                        <div className="upload-section">
                            <label>Upload Resume</label>
                            <div className={`file-dropzone ${resumeFile ? "file-uploaded" : ""}`}>
                                {resumeFile ? (
                                    <div className="file-preview">
                                        <div className="file-preview-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div className="file-preview-info">
                                            <span className="file-name">{resumeFile.name}</span>
                                            <span className="file-size">{(resumeFile.size / 1024).toFixed(1)} KB</span>
                                        </div>
                                        <Button variant="ghost" onClick={() => setResumeFile(null)} style={{ width: 'auto', padding: '0.5rem' }}>✕</Button>
                                    </div>
                                ) : (
                                    <label htmlFor="resume" className="dropzone-label">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="upload-icon">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                        </svg>
                                        <p className="main-text">Click to upload or drag & drop</p>
                                        <p className="sub-text">PDF or DOCX (Max 5MB)</p>
                                    </label>
                                )}
                                <input
                                    onChange={(e) => setResumeFile(e.target.files[0] || null)}
                                    type="file"
                                    id="resume"
                                    accept=".pdf,.docx"
                                    hidden
                                />
                            </div>
                        </div>

                        <div className="divider">OR</div>

                        <div className="self-desc-section">
                            <label>Quick Self-Description</label>
                            <textarea
                                onChange={(e) => setSelfDescription(e.target.value)}
                                value={selfDescription}
                                placeholder="Describe your experience and skills..."
                            ></textarea>
                        </div>

                        <div className="info-box">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="info-icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                            </svg>
                            <p>Providing a <strong>Resume</strong> or a detailed <strong>Self Description</strong> helps AI create a more accurate plan.</p>
                        </div>
                    </div>
                </div>

                <div className="card-footer">
                    <span className="status-text">AI Strategy Engine Ready</span>
                    <div className="generate-btn-wrapper">
                        <Button 
                            variant="primary" 
                            onClick={handleGenerateReport} 
                            loading={loading}
                            disabled={!jobDescription || (!resumeFile && !selfDescription)}
                        >
                            Generate My Interview Strategy
                        </Button>
                    </div>
                </div>
            </motion.div>

            <motion.div className="recent-reports" variants={itemVariants}>
                <div className="reports-section-header">
                    <h2>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        Previous Reports
                    </h2>
                    {reports.length > 0 && (
                        <span className="reports-count">{reports.length} Reports</span>
                    )}
                </div>

                {reportsLoading ? (
                    <div className="reports-grid">
                        {[1, 2, 3].map((i) => <div key={i} className="skeleton-card" />)}
                    </div>
                ) : reports.length === 0 ? (
                    <div className="reports-empty">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        <p>You haven't generated any reports yet. Start by creating your first strategy above!</p>
                    </div>
                ) : (
                    <div className="reports-grid">
                        <AnimatePresence mode="popLayout">
                            {reports.map((report, idx) => (
                                <motion.div
                                    key={report._id}
                                    className="report-card"
                                    onClick={() => navigate(`/interview/${report._id}`)}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    whileHover={{ translateY: -4 }}
                                >
                                    <p className="report-desc">{trimDescription(report.Description || report.description)}</p>
                                    <div className="report-stats">
                                        <span>⚙ {report.technicalQuestions?.length ?? 0} Tech</span>
                                        <span>💬 {report.behavioralQuestions?.length ?? 0} Behav</span>
                                        <span>🎯 {report.skillsGap?.length ?? 0} Gaps</span>
                                    </div>
                                    <div className="report-card-footer">
                                        <span className="date">
                                            {report.createdAt ? new Date(report.createdAt).toLocaleDateString() : 'Recent'}
                                        </span>
                                        <svg className="report-card-arrow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                        </svg>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </motion.div>

            <footer className="page-footer">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Help Center</a>
                <p className="copyright">&copy; {new Date().getFullYear()} GetYourDestination</p>
            </footer>
        </motion.main>
    );
}
