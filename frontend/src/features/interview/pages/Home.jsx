import React, { useState, useRef } from "react";
import "../styles/Home.scss";
import "../../../styles/button.scss";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const { loading, generateReport } = useInterview();
    // Corrected the variable names and setters so they match
    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const [resumeFile, setResumeFile] = useState(null);
    const navigate = useNavigate();

    const handleGenerateReport = async () => {
        try {
            // useInterview expects {jobDescription, resume, selfDescription}
            // Passing resumeFile as the "resume" argument
            const data = await generateReport({ 
                jobDescription, 
                resume: resumeFile, 
                selfDescription 
            });
            
            // Navigate based on whether the backend wraps the response in a report object
            if (data?.report?._id) {
                navigate(`/interview/${data.report._id}`);
            } else if (data?._id) {
                navigate(`/interview/${data._id}`);
            }
        } catch (error) {
            console.error("Report generation failed:", error);
        }
    }

    return (
        <main className="home">
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
                                placeholder="Paste the full job description here...&#10;e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
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
                            <div className="file-dropzone">
                                <label htmlFor="resume" className="dropzone-label">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="upload-icon">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                    </svg>
                                    <p className="main-text">Click to upload or drag & drop</p>
                                    <p className="sub-text">PDF or DOCX (Max 5MB)</p>
                                </label>
                                <input 
                                    onChange={(e) => setResumeFile(e.target.files[0])} 
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
                        {loading ? "Generating..." : "★ Generate My Interview Strategy"}
                    </button>
                </div>
            </div>

            <footer className="page-footer">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Help Center</a>
            </footer>
        </main>
    )
}
