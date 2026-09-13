import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Code2, 
  MessageSquareCode, 
  Map, 
  FileCheck2, 
  Sparkles, 
  ShieldCheck, 
  Download, 
  Tag, 
  CheckCircle2 
} from "lucide-react";
import { useInterview } from "../hooks/useInterview";
import { downloadResume } from "../services/resume.utils";
import Navbar from "../../../components/common/Navbar";
import Footer from "../../../components/common/Footer";
import Button from "../../../components/common/Button";
import SEO from "../../../components/common/SEO";
import "../styles/interview.scss";

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
        setTimeout(() => setResumeStatus('idle'), 3500);
      } catch (err) {
        console.error("Resume generation failed:", err);
        setResumeStatus('idle');
      }
    }, 600);
  };

  if (loading) {
    return (
      <div className="interview-page">
        <SEO title="Analyzing Strategy — GetYourDestination" />
        <Navbar />
        <main className="container-fluid interview-main-wrap">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Synthesizing role-calibrated interview intelligence…</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="interview-page">
        <SEO title="Strategy Not Found — GetYourDestination" />
        <Navbar />
        <main className="container-fluid interview-main-wrap">
          <div className="loading-state">
            <p>Strategy report not found or has expired.</p>
            <Link to="/service">
              <Button variant="primary" icon={ArrowLeft} style={{ marginTop: '1rem' }}>
                Return to Strategy Studio
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const renderContent = () => {
    const content = {
      'Technical questions': {
        title: 'Technical Preparation',
        items: report.technicalQuestions || []
      },
      'Behavioral questions': {
        title: 'Behavioral Strategy (STAR Matrix)',
        items: report.behavioralQuestions || []
      },
      'Road Map': {
        title: '7-Day Learning Roadmap',
        items: report.preparationPlan || []
      }
    };

    const activeContent = content[activeTab] || content['Technical questions'];

    return (
      <motion.div 
        key={activeTab}
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -8 }}
        className="content-list"
      >
        <h2>{activeContent.title}</h2>
        {activeContent.items.map((item, idx) => (
          <motion.div 
            key={idx} 
            className="info-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
          >
            {activeTab === 'Road Map' ? (
              <>
                <h4>{item.day} — {item.topic}</h4>
                <div className="answer">
                  <strong>Recommended Mastery & Resources</strong>
                  {item.resources}
                </div>
              </>
            ) : (
              <>
                <h4>Q: {item.question}</h4>
                {item.intention && (
                  <div className="intention">
                    <strong>Interviewer Intention:</strong> {item.intention}
                  </div>
                )}
                <div className="answer">
                  <strong>Recommended Approach / Structured Response</strong>
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
    resumeStatus === 'generating' ? 'Generating ATS Resume…' :
    resumeStatus === 'done'       ? 'Downloaded HTML!' :
                                    'Download ATS Resume';

  return (
    <div className="interview-page">
      <SEO 
        title="Strategy Blueprint — GetYourDestination" 
        description="Your tailored role-specific interview strategy report with technical deep dives, STAR matrices, and 7-day preparation roadmap." 
      />

      <Navbar />

      <main className="container-fluid interview-main-wrap">
        {/* Header Strip with Back Link */}
        <div className="report-header-strip">
          <Link to="/service" className="back-btn-link">
            <ArrowLeft size={16} />
            <span>Back to Strategy Studio</span>
          </Link>

          <div className="report-meta-tags">
            <span className="verified-badge">
              <ShieldCheck size={13} /> Gemini AI Calibrated
            </span>
            <span className="gold-badge" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
              <Sparkles size={12} /> Executive Blueprint
            </span>
          </div>
        </div>

        {/* 3-Column Main Workspace */}
        <div className="interview-container">
          {/* Left Navigation Sidebar */}
          <aside className="sidebar left-sidebar">
            <ul className="nav-menu">
              {[
                { label: 'Technical questions', icon: Code2 },
                { label: 'Behavioral questions', icon: MessageSquareCode },
                { label: 'Road Map', icon: Map }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.label;
                return (
                  <li
                    key={tab.label}
                    className={`nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.label)}
                  >
                    <Icon size={18} />
                    <span>{tab.label}</span>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* Main Content Area */}
          <section className="main-content">
            <AnimatePresence mode="wait">
              {renderContent()}
            </AnimatePresence>
          </section>

          {/* Right Sidebar (Focus Areas & Resume Generator) */}
          <aside className="sidebar right-sidebar">
            <h3 className="section-title">Focus & Skill Gaps</h3>
            <div className="tags-container">
              {(report.skillsGap || []).map((gap, idx) => (
                <span 
                  key={idx} 
                  className="tag" 
                  title={gap.recommendation}
                >
                  {gap.skill}
                </span>
              ))}
            </div>

            <div className="resume-action">
              <p className="resume-hint">
                Export an ATS-optimized, semantic HTML resume skeleton aligned to this role.
              </p>
              <Button
                variant={resumeStatus === 'done' ? 'secondary' : 'primary'}
                onClick={handleGenerateResume}
                loading={resumeStatus === 'generating'}
                icon={Download}
                style={{ width: '100%' }}
              >
                {resumeBtnLabel}
              </Button>
              
              {resumeStatus === 'done' && (
                <motion.div 
                  className="resume-done-note"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Open downloaded <code>.html</code> &rarr; press <code>Ctrl+P</code> &rarr; Save as PDF.
                </motion.div>
              )}
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}