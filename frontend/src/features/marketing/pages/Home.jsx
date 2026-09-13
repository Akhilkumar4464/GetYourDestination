import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Code2, 
  MessageSquareCode, 
  Map, 
  FileCheck2, 
  Star, 
  UploadCloud, 
  FileText, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2,
  TrendingUp
} from 'lucide-react';
import Navbar from '../../../components/common/Navbar';
import Footer from '../../../components/common/Footer';
import Button from '../../../components/common/Button';
import SEO from '../../../components/common/SEO';
import '../styles/Home.scss';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.12, delayChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const stats = [
    { number: '94.8%', label: 'Placement Success Rate', desc: 'Candidates securing target offers' },
    { number: '3.5x', label: 'Velocity Multiplier', desc: 'Faster structured preparation' },
    { number: '10k+', label: 'Strategies Crafted', desc: 'Synthesized with Gemini AI' }
  ];

  const workflowSteps = [
    {
      step: '01',
      icon: UploadCloud,
      title: 'Supply Your Profile',
      desc: 'Upload your latest resume (PDF/DOCX) or enter a concise self-description of your domain expertise.'
    },
    {
      step: '02',
      icon: FileText,
      title: 'Target The Position',
      desc: 'Paste the exact job description for the engineering, product, or leadership role you are pursuing.'
    },
    {
      step: '03',
      icon: Cpu,
      title: 'Receive Bespoke Strategy',
      desc: 'Our Gemini AI engine generates technical deep dives, STAR behavioral templates, and an adaptive 7-day roadmap.'
    }
  ];

  const features = [
    {
      icon: Code2,
      title: 'Targeted Technical Deep Dives',
      desc: 'Algorithm, architecture, system design, and framework challenges calibrated precisely to the recruiter’s job spec.',
      tag: 'Role-Calibrated'
    },
    {
      icon: MessageSquareCode,
      title: 'STAR Behavioral Framework',
      desc: 'Formulate high-impact Situation, Task, Action, and Result responses that leadership and hiring panels reward.',
      tag: 'Executive Ready'
    },
    {
      icon: Map,
      title: 'Adaptive 7-Day Roadmaps',
      desc: 'Structured daily preparation blueprints pinpointing your exact skill gaps and prioritizing high-leverage topics.',
      tag: 'Tailored Timeline'
    },
    {
      icon: FileCheck2,
      title: 'ATS-Optimized Resumes',
      desc: 'Export clean, semantic HTML resumes tailored to the job description with one click — print or save directly to PDF.',
      tag: 'One-Click Export'
    }
  ];

  const testimonialsPreview = [
    {
      quote: "GetYourDestination accurately diagnosed the system design topics for my Staff Engineer interview. The 7-day roadmap kept my prep laser-focused.",
      name: "Marcus Vance",
      role: "Staff Software Engineer • Formerly Uber",
      initial: "M"
    },
    {
      quote: "The STAR behavioral matrices completely transformed how I framed leadership conflict questions during final rounds. Landed my dream offer!",
      name: "Elena Rostova",
      role: "Lead Product Manager • FinTech Unicorn",
      initial: "E"
    },
    {
      quote: "The luxury editorial feel and precision of the generated technical questions made this feel like a $5,000 executive career coach.",
      name: "Devon Thorne",
      role: "Solutions Architect • Enterprise Cloud",
      initial: "D"
    }
  ];

  return (
    <div className="marketing-home">
      <SEO 
        title="GetYourDestination — Bespoke AI Career Intelligence & Interview Advisory" 
        description="Master your upcoming interviews with tailored technical deep dives, STAR behavioral matrices, adaptive roadmaps, and ATS resumes in an Obsidian & Gold executive suite."
      />

      <Navbar />

      <motion.main initial="hidden" animate="visible" variants={containerVariants}>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-glow-vignette" />
          <div className="container-fluid hero-content">
            <motion.div className="hero-badge" variants={itemVariants}>
              <span className="gold-badge">
                <Sparkles size={13} /> Executive Interview Advisory Edition
              </span>
            </motion.div>

            <motion.h1 className="hero-title" variants={itemVariants}>
              Land Your Next Role With <br />
              <span className="gold-gradient">Unflinching Confidence</span>
            </motion.h1>

            <motion.p className="hero-subtitle" variants={itemVariants}>
              Precision AI career intelligence tailored to your exact target position. Generate role-calibrated technical deep dives, STAR behavioral matrices, and 7-day roadmaps in seconds.
            </motion.p>

            <motion.div className="hero-cta-group" variants={itemVariants}>
              <Link to="/service" className="btn-gold-solid" style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}>
                Start Free Analysis <ArrowRight size={18} />
              </Link>
              <Link to="/about" className="btn-gold-outline" style={{ padding: '0.85rem 1.85rem', fontSize: '1rem' }}>
                Explore Methodology
              </Link>
            </motion.div>

            <motion.div className="hero-trust-bar" variants={itemVariants}>
              <span className="trust-label">Trusted by engineers & leaders targeting</span>
              <div className="trust-logos">
                <span>Google</span>
                <span>Stripe</span>
                <span>Microsoft</span>
                <span>Amazon</span>
                <span>Meta</span>
                <span>Apple</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Social Proof Metric Row */}
        <section className="stat-row-section">
          <div className="container-fluid">
            <div className="stats-grid">
              {stats.map((item, idx) => (
                <motion.div key={idx} className="stat-card" variants={itemVariants}>
                  <span className="stat-number">{item.number}</span>
                  <span className="stat-title">{item.label}</span>
                  <span className="stat-desc">{item.desc}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="workflow-section">
          <div className="container-fluid">
            <div className="section-header">
              <span className="section-tagline">Structured Precision</span>
              <h2>How The Advisory Engine Works</h2>
              <p>Three straightforward steps to transform raw job postings into an unfair preparation advantage.</p>
            </div>

            <div className="steps-grid">
              {workflowSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <motion.div key={idx} className="step-card" variants={itemVariants}>
                    <div className="step-header">
                      <div className="step-icon-box">
                        <Icon size={22} />
                      </div>
                      <span className="step-num-badge">STEP {step.step}</span>
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4 Feature Highlights Grid */}
        <section className="features-section">
          <div className="container-fluid">
            <div className="section-header">
              <span className="section-tagline">Comprehensive Strategy Suite</span>
              <h2>Engineered for High-Stakes Interviews</h2>
              <p>Every element designed to elevate your answers, address critical blindspots, and impress hiring bars.</p>
            </div>

            <div className="features-grid">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <motion.div key={idx} className="feature-box" variants={itemVariants}>
                    <div className="feature-icon-wrapper">
                      <Icon size={22} />
                    </div>
                    <h3>{feat.title}</h3>
                    <p>{feat.desc}</p>
                    <div className="feature-pill">
                      <CheckCircle2 size={13} style={{ color: 'var(--gold-primary)' }} />
                      <span>{feat.tag}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Preview Section */}
        <section className="testimonials-preview-section">
          <div className="container-fluid">
            <div className="section-header">
              <span className="section-tagline">Verified Testimonials</span>
              <h2>From Ambition to Signed Offer</h2>
              <p>Real feedback from candidates who used GetYourDestination to secure top-tier placements.</p>
            </div>

            <div className="testimonials-grid">
              {testimonialsPreview.map((item, idx) => (
                <motion.div key={idx} className="testimonial-card" variants={itemVariants}>
                  <div>
                    <div className="stars-row">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={15} fill="var(--gold-primary)" stroke="none" />
                      ))}
                    </div>
                    <p className="quote-text">“{item.quote}”</p>
                  </div>
                  <div className="candidate-info">
                    <div className="candidate-avatar">{item.initial}</div>
                    <div className="candidate-meta">
                      <span className="candidate-name">{item.name}</span>
                      <span className="candidate-role">{item.role}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="testimonials-footer-action">
              <Link to="/feedback" className="btn-gold-outline">
                View All Verified Reviews & Leave Feedback <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Closing Conversion Band */}
        <section className="closing-cta-band">
          <div className="container-fluid">
            <div className="cta-card-luxury">
              <div className="cta-card-glow" />
              <span className="section-tagline">Take The Initiative</span>
              <h2>Step Into Your Next Interview Primed For Excellence</h2>
              <p>
                Synthesize your bespoke interview preparation strategy in under 30 seconds. No fluff, pure tailored precision.
              </p>
              <div className="cta-buttons">
                <Link to="/service" className="btn-gold-solid" style={{ padding: '0.85rem 2.25rem' }}>
                  Launch Strategy Studio <ArrowRight size={18} />
                </Link>
                <Link to="/contact" className="btn-ghost-luxury">
                  Speak With Our Advisory Team
                </Link>
              </div>
            </div>
          </div>
        </section>
      </motion.main>

      <Footer />
    </div>
  );
}
