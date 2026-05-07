import React, { useState, useEffect } from "react";
import "../styles/Home.scss";
import "../../../styles/button.scss";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/hooks/useAuth";

export default function Home() {
    const { loading, generateReport, reports, fetchReportsByUserId } = useInterview();
    const { user, handleLogout } = useAuth();
    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const [resumeFile, setResumeFile] = useState(null);
    const [reportsLoading, setReportsLoading] = useState(true);
    const navigate = useNavigate();

    // Load all reports for this user on mount
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

    // Trim the job description to a readable preview
    const trimDescription = (text, maxLen = 90) => {
        if (!text) return "No description provided";
        return text.length > maxLen ? text.slice(0, maxLen).trimEnd() + "…" : text;
    };

    return (
        <main className="home">
            <div className="user-profile">
                <div className="user-info">
                    <div className="user-avatar">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="user-details">
                        <span className="user-name">{user?.name || "User"}</span>
                        <span className="user-email">{user?.email}</span>
                    </div>
                </div>
                <button onClick={handleLogout} className="logout-btn" title="Logout">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="logout-icon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>
                    Logout
                </button>
            </div>

            <div className="page-header">
                <h1>Create Your Custom <span>Interview Plan</span></h1>
                <p>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
            </div>

            <div className="main-card">
                <div className="card-content">
                    <div className="left-panel">
                        <div className="section-header">
                            <div className="header-title">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                                </svg>
                                <h2>Target Job Description</h2>
                            </div>
                            <span className="badge badge-required">REQUIRED</span>
                        </div>
                        <div className="textarea-wrapper">
                            <textarea
                                onChange={(e) => { setJobDescription(e.target.value) }}
                                value={jobDescription}
                                name="jobDescription"
                                id="jobDescription"
                                placeholder={"Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"}
                            ></textarea>
                            <span className="char-count">{jobDescription.length} / 5000 chars</span>
                        </div>
                    </div>

                    <div className="right-panel">
                        <div className="section-header">
                            <div className="header-title">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                                <h2>Your Profile</h2>
                            </div>
                        </div>

                        <div className="upload-section">
                            <div className="upload-header">
                                <label>Upload Resume</label>
                                <span className="badge badge-best">BEST RESULTS</span>
                            </div>
                            <div className={`file-dropzone${resumeFile ? " file-uploaded" : ""}`}>
                                {resumeFile ? (
                                    <div className="file-preview">
                                        <div className="file-preview-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div className="file-preview-info">
                                            <p className="file-name">{resumeFile.name}</p>
                                            <p className="file-size">{(resumeFile.size / 1024).toFixed(1)} KB &bull; Ready to upload</p>
                                        </div>
                                        <button
                                            type="button"
                                            className="file-remove-btn"
                                            onClick={() => {
                                                setResumeFile(null);
                                                document.getElementById("resume").value = "";
                                            }}
                                        >✕</button>
                                    </div>
                                ) : (
                                    <label htmlFor="resume" className="dropzone-label">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="upload-icon">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                        </svg>
                                        <p className="main-text">Click to upload or drag &amp; drop</p>
                                        <p className="sub-text">PDF or DOCX (Max 5MB)</p>
                                    </label>
                                )}
                                <input
                                    onChange={(e) => setResumeFile(e.target.files[0] || null)}
                                    type="file"
                                    name="resume"
                                    accept=".pdf,.docx"
                                    id="resume"
                                    className="file-input"
                                />
                            </div>
                        </div>

                        <div className="divider">
                            <span>OR</span>
                        </div>

                        <div className="self-desc-section">
                            <label>Quick Self-Description</label>
                            <textarea
                                onChange={(e) => setSelfDescription(e.target.value)}
                                value={selfDescription}
                                name="selfDescription"
                                id="selfDescription"
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                            ></textarea>
                        </div>

                        <div className="info-box">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="info-icon">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                            </svg>
                            <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</p>
                        </div>
                    </div>
                </div>

                <div className="card-footer">
                    <span className="status-text">AI-Powered Strategy Generation • Approx 30s</span>
                    <button
                        onClick={handleGenerateReport}
                        disabled={loading}
                        className="btn generate-btn">
                        {loading ? "Generating…" : "★ Generate My Interview Strategy"}
                    </button>
                </div>
            </div>

            {/* ── All Interview Reports ── */}
            <div className="recent-reports">
                <div className="reports-section-header">
                    <h2>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                        </svg>
                        My Interview Reports
                    </h2>
                    {reports.length > 0 && (
                        <span className="reports-count">{reports.length} report{reports.length !== 1 ? "s" : ""}</span>
                    )}
                </div>

                {reportsLoading ? (
                    <div className="reports-grid">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="report-card skeleton-card">
                                <div className="skeleton-line skeleton-title"></div>
                                <div className="skeleton-line skeleton-body"></div>
                                <div className="skeleton-line skeleton-body short"></div>
                                <div className="skeleton-line skeleton-date"></div>
                            </div>
                        ))}
                    </div>
                ) : reports.length === 0 ? (
                    <div className="reports-empty">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        <p>No reports yet. Generate your first interview strategy above!</p>
                    </div>
                ) : (
                    <div className="reports-grid">
                        {reports.map((report) => {
                            const descPreview = trimDescription(report.Description || report.description);
                            const techCount = report.technicalQuestions?.length ?? 0;
                            const behavCount = report.behavioralQuestions?.length ?? 0;
                            const skillCount = report.skillsGap?.length ?? 0;
                            const dateStr = report.createdAt
                                ? new Date(report.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                                : "";

                            return (
                                <div
                                    key={report._id}
                                    className="report-card"
                                    onClick={() => navigate(`/interview/${report._id}`)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => e.key === "Enter" && navigate(`/interview/${report._id}`)}
                                >
                                    <div className="report-card-top">
                                        <p className="report-desc">{descPreview}</p>
                                    </div>
                                    <div className="report-stats">
                                        <span title="Technical Questions">⚙ {techCount} Tech</span>
                                        <span title="Behavioral Questions">💬 {behavCount} Behav</span>
                                        <span title="Skill Gaps">🎯 {skillCount} Gaps</span>
                                    </div>
                                    <p className="date">{dateStr}</p>
                                    <div className="report-card-arrow">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                        </svg>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* footer */}
            <footer className="page-footer">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Help Center</a>
            </footer>
        </main>
    );
}
