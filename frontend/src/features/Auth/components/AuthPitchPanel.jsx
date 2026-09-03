import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Code2, 
  MessageSquareCode, 
  Map, 
  FileCheck2,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

export default function AuthPitchPanel() {
  const features = [
    {
      icon: Code2,
      title: 'Targeted Technical Deep Dives',
      desc: 'Algorithm, architecture, and framework challenges matched directly to the job description.'
    },
    {
      icon: MessageSquareCode,
      title: 'STAR Behavioral Framework',
      desc: 'Formulate high-impact situation, task, action, and result responses that recruiters love.'
    },
    {
      icon: Map,
      title: 'Adaptive 7-Day Roadmaps',
      desc: 'Customized daily preparation plans prioritizing your exact skill gaps.'
    },
    {
      icon: FileCheck2,
      title: 'ATS-Optimized Resumes',
      desc: 'One-click customized resume exports ready for immediate submission.'
    }
  ];

  return (
    <div className="auth-pitch-panel">
      <div className="pitch-header">
        <div className="pitch-badge">
          <Sparkles size={14} />
          <span>AI-Powered Career GPS</span>
        </div>

        <h2 className="pitch-title">
          Land Your Next Role With <span>Confidence</span>
        </h2>

        <p className="pitch-subtitle">
          Join ambitious engineers, product leaders, and designers who prepare smarter with personalized AI strategies.
        </p>

        <div className="pitch-features">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div 
                key={idx} 
                className="pitch-feature-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + idx * 0.1, duration: 0.4 }}
              >
                <div className="feature-icon-box">
                  <Icon size={18} />
                </div>
                <div className="feature-text">
                  <h4>{feat.title}</h4>
                  <p>{feat.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="pitch-stats-row">
        <div className="pitch-stat-box">
          <span className="stat-number">94.8%</span>
          <span className="stat-desc">Success Rate</span>
        </div>
        <div className="pitch-stat-box">
          <span className="stat-number">3.5x</span>
          <span className="stat-desc">Faster Preparation</span>
        </div>
        <div className="pitch-stat-box">
          <span className="stat-number">10k+</span>
          <span className="stat-desc">Strategies Crafted</span>
        </div>
      </div>
    </div>
  );
}
