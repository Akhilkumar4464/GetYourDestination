import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { 
  Sparkles, 
  Cpu, 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  ArrowRight, 
  FileCheck, 
  History, 
  HelpCircle, 
  X,
  Code2,
  MessageSquareCode,
  Target
} from "lucide-react";
import { useInterview } from "../hooks/useInterview";
import { useAuth } from "../../Auth/hooks/useAuth";
import { useToast } from "../../../context/ToastContext";
import Navbar from "../../../components/common/Navbar";
import Footer from "../../../components/common/Footer";
import Button from "../../../components/common/Button";
import SEO from "../../../components/common/SEO";
import "../styles/Service.scss";

export default function Service() {
  const { loading, generateReport, reports, fetchReportsByUserId } = useInterview();
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [reportsLoading, setReportsLoading] = useState(true);

  useEffect(() => {
    const loadReports = async () => {
      try {
        if (user) {
          await fetchReportsByUserId();
        }
      } catch (err) {
        console.error("Failed to load previous strategy reports:", err);
      } finally {
        setReportsLoading(false);
      }
    };
    loadReports();
  }, [user]);

  const handleGenerateReport = async () => {
    if (!jobDescription) {
      showToast("Please provide a Job Description to analyze.", "error");
      return;
    }

    if (!resumeFile && !selfDescription) {
      showToast("Please upload your Resume or provide a Quick Self-Description.", "error");
      return;
    }

    try {
      showToast("Synthesizing your bespoke interview strategy with Gemini AI...", "info");
      const data = await generateReport({
        jobDescription,
        resume: resumeFile,
        selfDescription
      });

      const reportId = data?.report?._id || data?._id;
      if (reportId) {
        showToast("Strategy successfully synthesized! Loading report...", "success");
        navigate(`/interview/${reportId}`);
      }
    } catch (error) {
      console.error("Report generation failed:", error);
      showToast("Failed to generate strategy. Please check your inputs and try again.", "error");
    }
  };

  const trimDescription = (text, maxLen = 95) => {
    if (!text) return "Software Engineering Strategy Blueprint";
    return text.length > maxLen ? text.slice(0, maxLen).trimEnd() + "…" : text;
  };

  return (
    <div className="service-page">
      <SEO 
        title="Strategy Studio — GetYourDestination AI Career GPS" 
        description="Synthesize role-calibrated technical deep dives, STAR behavioral matrices, and 7-day preparation roadmaps in our Obsidian & Gold strategy studio." 
      />

      <Navbar />

      <main className="container-fluid service-content-wrap">
        {/* Intro Context Banner */}
        <section className="service-intro-strip">
          <div className="intro-badge">
            <span className="gold-badge">
              <Sparkles size={13} /> Gemini AI Strategy Studio
            </span>
          </div>
          <h1>
            Target Your Next <span className="gold-gradient">Career Destination</span>
          </h1>
          <p>
            Supply the exact job description along with your resume or background summary. Our intelligence engine synthesizes role-calibrated technical questions, STAR behavioral frameworks, skill gaps, and an ATS-ready resume skeleton.
          </p>
        </section>

        {/* Dual Input Workspace Card */}
        <section className="main-strategy-card">
          <div className="card-content-split">
            {/* Left Panel: Target Job Description */}
            <div className="left-panel">
              <div className="panel-header">
                <div className="title-with-icon">
                  <div className="icon-box-sm">
                    <FileText size={16} />
                  </div>
                  <h2>Job Description</h2>
                </div>
                <span className="required-badge">Mandatory</span>
              </div>

              <div className="textarea-container">
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the full job posting here (roles, tech stack, requirements, qualifications)..."
                  maxLength={5000}
                ></textarea>
                <span className="char-counter">{jobDescription.length} / 5000</span>
              </div>
            </div>

            {/* Right Panel: Resume / Candidate Profile */}
            <div className="right-panel">
              <div className="panel-header">
                <div className="title-with-icon">
                  <div className="icon-box-sm">
                    <UploadCloud size={16} />
                  </div>
                  <h2>Candidate Profile</h2>
                </div>
              </div>

              {/* Resume Upload Dropzone */}
              <div className={`file-dropzone-luxury ${resumeFile ? "file-uploaded" : ""}`}>
                {resumeFile ? (
                  <div className="file-preview-card">
                    <div className="file-meta-group">
                      <FileCheck size={24} style={{ color: "var(--gold-primary)" }} />
                      <div>
                        <div className="file-name">{resumeFile.name}</div>
                        <div className="file-size">{(resumeFile.size / 1024).toFixed(1)} KB • Attached</div>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setResumeFile(null)} 
                      className="btn-ghost-luxury"
                      style={{ padding: "0.3rem 0.6rem" }}
                      aria-label="Remove uploaded resume"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <label htmlFor="resume-file-input" className="dropzone-trigger">
                    <UploadCloud size={30} className="upload-icon" />
                    <p className="main-text">Upload Resume (PDF or DOCX)</p>
                    <p className="sub-text">Click to browse or drag & drop (Max 5MB)</p>
                  </label>
                )}
                <input
                  type="file"
                  id="resume-file-input"
                  accept=".pdf,.docx"
                  onChange={(e) => setResumeFile(e.target.files[0] || null)}
                  style={{ display: "none" }}
                />
              </div>

              <div className="divider-text-or">OR SPECIFY DIRECTLY</div>

              {/* Quick Self-Description */}
              <div className="self-desc-box">
                <label htmlFor="self-description-input">Quick Self-Description / Core Stack</label>
                <textarea
                  id="self-description-input"
                  value={selfDescription}
                  onChange={(e) => setSelfDescription(e.target.value)}
                  placeholder="e.g. 4 years of experience with React, Node.js, distributed caches, and AWS..."
                ></textarea>
              </div>

              <div className="advisory-hint-card">
                <HelpCircle size={18} className="hint-icon" />
                <p>
                  Providing a <strong>detailed resume</strong> or <strong>tech stack summary</strong> enables our AI to accurately diagnose your candidate skills gap.
                </p>
              </div>
            </div>
          </div>

          {/* Action Footer Bar */}
          <div className="card-action-footer">
            <div className="engine-indicator">
              <span className="green-pulse"></span>
              <span>Gemini 2.5 Advisory Intelligence Online</span>
            </div>

            <Button
              variant="primary"
              onClick={handleGenerateReport}
              loading={loading}
              disabled={!jobDescription || (!resumeFile && !selfDescription)}
              icon={ArrowRight}
              iconPosition="right"
              style={{ padding: "0.85rem 2rem", fontSize: "0.95rem" }}
            >
              Generate My Interview Strategy
            </Button>
          </div>
        </section>

        {/* Previous Reports Section */}
        <section className="previous-reports-section">
          <div className="section-title-bar">
            <div className="title-group">
              <History size={20} style={{ color: "var(--gold-primary)" }} />
              <h2>Previous Strategy Reports</h2>
            </div>
            {reports?.length > 0 && (
              <span className="badge-count">{reports.length} Saved Reports</span>
            )}
          </div>

          {reportsLoading ? (
            <div className="reports-cards-grid">
              {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton-box" />
              ))}
            </div>
          ) : !reports || reports.length === 0 ? (
            <div className="reports-empty-state">
              <Cpu size={40} className="empty-icon" />
              <p>You haven't generated any interview strategies yet. Fill in the job description above to synthesize your first report.</p>
            </div>
          ) : (
            <div className="reports-cards-grid">
              <AnimatePresence mode="popLayout">
                {reports.map((report, idx) => (
                  <motion.div
                    key={report._id}
                    className="report-card-item"
                    onClick={() => navigate(`/interview/${report._id}`)}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <div>
                      <p className="report-role-preview">
                        {trimDescription(report.Description || report.description)}
                      </p>
                      <div className="report-metrics-row">
                        <span>⚙ {report.technicalQuestions?.length ?? 0} Technical</span>
                        <span>💬 {report.behavioralQuestions?.length ?? 0} Behavioral</span>
                        <span>🎯 {report.skillsGap?.length ?? 0} Skill Gaps</span>
                      </div>
                    </div>

                    <div className="report-footer-meta">
                      <span>
                        {report.createdAt ? new Date(report.createdAt).toLocaleDateString() : "Recent Strategy"}
                      </span>
                      <ArrowRight size={15} className="card-arrow-icon" />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
