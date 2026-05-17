import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/interview.scss";
import { useInterview } from "../hooks/useInterview";
import { useParams, Link } from "react-router-dom";
import { downloadResume } from "../services/resume.utils";
import Button from "../../../components/common/Button";
import SEO from "../../../components/common/SEO";

export default function Interview() {
  const [activeTab, setActiveTab] = useState('Technical questions');
  const [resumeStatus, setResumeStatus] = useState('idle'); // 'idle' | 'generating' | 'done'
  const { report, loading, fetchReports } = useInterview();
  const { interviewId } = useParams();

  useEffect(() => {
    if (interviewId && !report) {
      fetchReports(interviewId);
    }
  }, [interviewId]);

  const handleGenerateResume = () => {
    if (!report) return;
    setResumeStatus('generating');
    setTimeout(() => {
      try {
        downloadResume(report);
        setResumeStatus('done');
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
          <p>Analyzing your career path…</p>
        </div>
      </main>
    );
  }

  if (!report) {
    return (
      <main className="interview-page">
        <div className="loading-state">
          <p>Strategy report not found.</p>
          <Link to="/">
            <Button variant="outline" style={{ marginTop: '1rem', width: 'auto' }}>Go Back Dashboard</Button>
          </Link>
        </div>
      </main>
    );
  }

  const renderContent = () => {
    const content = {
      'Technical questions': {
        title: 'Technical Preparation',
        items: report.technicalQuestions || []
      },
      'Behavioral questions': {
        title: 'Behavioral Strategy',
        items: report.behavioralQuestions || []
      },
      'Road Map': {
        title: 'Learning Roadmap',
        items: report.preparationPlan || []
      }
    };

    const activeContent = content[activeTab];

    return (
      <motion.div 
        key={activeTab}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        className="content-list"
      >
        <h2>{activeContent.title}</h2>
        {activeContent.items.map((item, idx) => (
          <motion.div 
            key={idx} 
            className="info-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            {activeTab === 'Road Map' ? (
              <>
                <h4>{item.day} — {item.topic}</h4>
                <p className="answer">{item.resources}</p>
              </>
            ) : (
              <>
                <h4>Q: {item.question}</h4>
                <div className="intention">
                   {item.intention}
                </div>
                <div className="answer">
                  <strong>Suggested Approach</strong>
                  {item.answer}
                </div>
              </>
            )}
          </motion.div>
        ))}
      </motion.div>
    );
  };

  const resumeBtnLabel =
    resumeStatus === 'generating' ? 'Generating…' :
    resumeStatus === 'done'       ? 'Downloaded!' :
                                    'Generate Resume';

  return (
    <motion.main 
      className="interview-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <SEO title="Interview Plan" />
      
      <div className="interview-container">
        {/* Left Sidebar */}
        <aside className="sidebar left-sidebar">
          <ul className="nav-menu">
            {['Technical questions', 'Behavioral questions', 'Road Map'].map((tab) => (
              <li
                key={tab}
                className={`nav-item ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'Technical questions' && (
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                )}
                {tab === 'Behavioral questions' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                )}
                {tab === 'Road Map' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                )}
                {tab}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content Area */}
        <section className="main-content">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </section>

        {/* Right Sidebar */}
        <aside className="sidebar right-sidebar">
          <h3 className="section-title">Focus Areas</h3>
          <div className="tags-container">
            {(report.skillsGap || []).map((gap, idx) => (
              <motion.span 
                key={idx} 
                className="tag" 
                title={gap.recommendation}
                whileHover={{ scale: 1.05 }}
              >
                {gap.skill}
              </motion.span>
            ))}
          </div>

          <div className="resume-action">
            <p className="resume-hint">
              Get a tailored resume skeleton based on this job requirements.
            </p>
            <Button
              variant={resumeStatus === 'done' ? 'secondary' : 'primary'}
              onClick={handleGenerateResume}
              loading={resumeStatus === 'generating'}
              icon={() => (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              )}
            >
              {resumeBtnLabel}
            </Button>
            
            {resumeStatus === 'done' && (
              <motion.div 
                className="resume-done-note"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Open the <code>.html</code> file → <code>Ctrl+P</code> → Save as PDF.
              </motion.div>
            )}
          </div>
        </aside>
      </div>
    </motion.main>
  );
}