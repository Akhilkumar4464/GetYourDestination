import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Cpu, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-fluid footer-content">
        {/* Brand Column */}
        <div className="footer-brand-section">
          <Link to="/" className="footer-brand-logo-wrap">
            <img 
              src="/logo.png" 
              alt="GetYourDestination — Careers with Clarity" 
              className="footer-brand-logo-img" 
            />
          </Link>
          <p className="footer-tagline">
            Bespoke AI career intelligence & executive interview strategy suite. Empowering candidates with tailored technical deep dives, STAR behavioral matrix frameworks, and ATS-optimized assets.
          </p>
          <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.75rem' }}>
            <Link to="/service" className="btn-gold-outline" style={{ padding: '0.45rem 1rem', fontSize: '0.8rem' }}>
              Launch Studio <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* Navigation Column */}
        <div className="footer-column">
          <h4 className="footer-col-title">Navigation</h4>
          <Link to="/">Home Overview</Link>
          <Link to="/about">Our Mission & Story</Link>
          <Link to="/service">Strategy Studio</Link>
          <Link to="/feedback">Reviews & Ratings</Link>
          <Link to="/contact">Advisory & Support</Link>
        </div>

        {/* Capabilities Column */}
        <div className="footer-column">
          <h4 className="footer-col-title">Capabilities</h4>
          <span>Targeted Technical Dives</span>
          <span>STAR Behavioral Matrix</span>
          <span>Adaptive 7-Day Roadmaps</span>
          <span>Skills Gap Diagnostics</span>
          <span>Print-Ready ATS Resumes</span>
        </div>

        {/* Advisory & Security Column */}
        <div className="footer-column">
          <h4 className="footer-col-title">System & Security</h4>
          <div className="engine-spec-badge">
            <Cpu size={14} style={{ color: 'var(--gold-primary)' }} />
            <span>Google Gemini Flash</span>
          </div>
          <div className="engine-spec-badge">
            <ShieldCheck size={14} style={{ color: 'var(--success)' }} />
            <span>Encrypted & Private</span>
          </div>
          <div className="engine-spec-badge">
            <CheckCircle2 size={14} style={{ color: 'var(--gold-light)' }} />
            <span>94.8% Candidate Match</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar container-fluid">
        <p className="copyright-text">
          &copy; {new Date().getFullYear()} GetYourDestination • All rights reserved. Obsidian & Gold Advisory Edition.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link to="/contact" style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Help Center</Link>
          <Link to="/about" style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Terms of Service</Link>
          <div className="footer-security-note">
            <span className="status-indicator-green"></span>
            <span>All AI Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
