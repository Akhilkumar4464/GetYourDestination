import React from 'react';
import { Sparkles, Shield, Cpu, Github, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-fluid footer-content">
        <div className="footer-brand-section">
          <div className="footer-brand-row">
            <div className="brand-icon-wrapper-sm">
              <Sparkles size={16} />
            </div>
            <span className="footer-brand-name">GetYourDestination</span>
            <span className="footer-version-badge">v2.0 Architecture</span>
          </div>
          <p className="footer-tagline">
            Next-generation AI career GPS & intelligent interview preparation studio. Tailored STAR responses, skills gap matrices, and live ATS resumes.
          </p>
        </div>

        <div className="footer-links-grid">
          <div className="footer-column">
            <h4 className="footer-col-title">Product</h4>
            <a href="#strategy-generator">Strategy Engine</a>
            <a href="#previous-reports">Saved Reports</a>
            <a href="#resume-builder">Resume Builder</a>
          </div>

          <div className="footer-column">
            <h4 className="footer-col-title">Capabilities</h4>
            <span>Technical Deep Dives</span>
            <span>STAR Behavioral Matrix</span>
            <span>Prep Roadmaps</span>
          </div>

          <div className="footer-column">
            <h4 className="footer-col-title">Engine Specs</h4>
            <div className="engine-spec-badge">
              <Cpu size={14} />
              <span>Google Gemini AI</span>
            </div>
            <div className="engine-spec-badge">
              <Shield size={14} />
              <span>Enterprise Grade</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar container-fluid">
        <p className="copyright-text">
          &copy; {new Date().getFullYear()} GetYourDestination • Built with React 19 & Google Gemini AI
        </p>
        <div className="footer-security-note">
          <span className="status-indicator-green"></span>
          <span>All AI Systems Operational</span>
        </div>
      </div>
    </footer>
  );
}
