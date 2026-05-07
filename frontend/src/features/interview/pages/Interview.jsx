import { useState, useEffect } from "react";
import "../styles/interview.scss";
import { useInterview } from "../hooks/useInterview";
import { useParams } from "react-router-dom";
import { downloadResume } from "../services/resume.utils";

export default function Interview() {
  const [activeTab, setActiveTab] = useState('Technical questions');
  const [resumeStatus, setResumeStatus] = useState('idle'); // 'idle' | 'generating' | 'done'
  const { report, loading, fetchReports } = useInterview();
  const { interviewId } = useParams();

  // Fetch report from backend if not already in context (e.g. on page refresh)
  useEffect(() => {
    if (interviewId && !report) {
      fetchReports(interviewId);
    }
  }, [interviewId]);

  const handleGenerateResume = () => {
    if (!report) return;
    setResumeStatus('generating');
    // Small delay so user sees the "Generating…" state
    setTimeout(() => {
      try {
        downloadResume(report);
        setResumeStatus('done');
        // Reset after 3 seconds
        setTimeout(() => setResumeStatus('idle'), 3000);
      } catch (err) {
        console.error("Resume generation failed:", err);
        setResumeStatus('idle');
      }
    }, 600);
  };

  if (loading) {
    return (
      <main className="interview-page">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading your interview report…</p>
        </div>
      </main>
    );
  }

  if (!report) {
    return (
      <main className="interview-page">
        <div className="loading-state">
          <p>Report not found. Please <a href="/">go back</a> and generate a new one.</p>
        </div>
      </main>
    );
  }

  const renderContent = () => {
    if (activeTab === 'Technical questions') {
      return (
        <div className="content-list">
          <h2>Technical Questions</h2>
          {(report.technicalQuestions || []).map((q, idx) => (
            <div key={idx} className="info-card">
              <h4>Q: {q.question}</h4>
              <p className="intention"><strong>Intention:</strong> {q.intention}</p>
              <p className="answer"><strong>Suggested Answer:</strong> {q.answer}</p>
            </div>
          ))}
        </div>
      );
    } else if (activeTab === 'Behavioral questions') {
      return (
        <div className="content-list">
          <h2>Behavioral Questions</h2>
          {(report.behavioralQuestions || []).map((q, idx) => (
            <div key={idx} className="info-card">
              <h4>Q: {q.question}</h4>
              <p className="intention"><strong>Intention:</strong> {q.intention}</p>
              <p className="answer"><strong>Suggested Answer:</strong> {q.answer}</p>
            </div>
          ))}
        </div>
      );
    } else if (activeTab === 'Road Map') {
      return (
        <div className="content-list">
          <h2>Preparation Road Map</h2>
          {(report.preparationPlan || []).map((step, idx) => (
            <div key={idx} className="info-card">
              <h4>{step.day} — {step.topic}</h4>
              <p>{step.resources}</p>
            </div>
          ))}
        </div>
      );
    }
  };

  const resumeBtnLabel =
    resumeStatus === 'generating' ? '⏳ Generating…' :
    resumeStatus === 'done'       ? '✅ Downloaded!' :
                                    '📄 Generate Resume';

  return (
    <main className="interview-page">
      <div className="interview-container">
        {/* Left Sidebar */}
        <aside className="sidebar left-sidebar">
          <ul className="nav-menu">
            <li
              className={`nav-item ${activeTab === 'Technical questions' ? 'active' : ''}`}
              onClick={() => setActiveTab('Technical questions')}
            >
              Technical questions
            </li>
            <li
              className={`nav-item ${activeTab === 'Behavioral questions' ? 'active' : ''}`}
              onClick={() => setActiveTab('Behavioral questions')}
            >
              Behavioral questions
            </li>
            <li
              className={`nav-item ${activeTab === 'Road Map' ? 'active' : ''}`}
              onClick={() => setActiveTab('Road Map')}
            >
              Road Map
            </li>
          </ul>
        </aside>

        {/* Main Content Area */}
        <section className="main-content">
          {renderContent()}
        </section>

        {/* Right Sidebar */}
        <aside className="sidebar right-sidebar">
          <h3 className="section-title">Skill Gaps</h3>
          <div className="tags-container">
            {(report.skillsGap || []).map((gap, idx) => (
              <span key={idx} className="tag" title={gap.recommendation}>
                {gap.skill}
              </span>
            ))}
          </div>

          {/* Generate Resume */}
          <div className="resume-action">
            <p className="resume-hint">
              Get a tailored resume skeleton based on this job description.
            </p>
            <button
              id="generate-resume-btn"
              className={`resume-btn ${resumeStatus}`}
              onClick={handleGenerateResume}
              disabled={resumeStatus === 'generating'}
            >
              {resumeBtnLabel}
            </button>
            {resumeStatus === 'done' && (
              <p className="resume-done-note">
                Open the downloaded <code>.html</code> file in your browser, then press <kbd>Ctrl+P</kbd> → Save as PDF.
              </p>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}