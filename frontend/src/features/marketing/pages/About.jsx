import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  GraduationCap, 
  Briefcase, 
  Compass, 
  ShieldCheck, 
  CheckCircle2, 
  Target, 
  Zap, 
  Eye, 
  Award 
} from 'lucide-react';
import Navbar from '../../../components/common/Navbar';
import Footer from '../../../components/common/Footer';
import SEO from '../../../components/common/SEO';
import '../styles/About.scss';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.12, delayChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const audienceSegments = [
    {
      icon: GraduationCap,
      title: 'Students & New Grads',
      desc: 'Demystify college placement seasons and corporate entrance rounds with structured roadmaps that bridge academic gaps.',
      tags: ['Campus Drives', 'Foundation Coding', 'STAR Behavioral']
    },
    {
      icon: Compass,
      title: 'Career Switchers',
      desc: 'Pivot into software engineering, product management, or data architectures with tailored interview talking points.',
      tags: ['Domain Transition', 'Portfolio Framing', 'Gap Analysis']
    },
    {
      icon: Briefcase,
      title: 'Senior Engineers & Leaders',
      desc: 'Sharpen system design narratives, cross-functional conflict handling, and executive vision challenges.',
      tags: ['System Architecture', 'Staff+ Framing', 'Offer Leverage']
    }
  ];

  const pillars = [
    {
      number: 'PILLAR 01',
      title: 'Bespoke Precision',
      desc: 'No generic question banks. Every strategy is synthesized directly against the exact job description and candidate resume.'
    },
    {
      number: 'PILLAR 02',
      title: 'Data-Driven Rigor',
      desc: 'Leverages Google Gemini models tuned specifically for hiring criteria, interviewer intentions, and STAR evaluation metrics.'
    },
    {
      number: 'PILLAR 03',
      title: 'Rapid Velocity',
      desc: 'Receive comprehensive technical deep dives and a complete 7-day preparation schedule in just 3 to 5 seconds.'
    },
    {
      number: 'PILLAR 04',
      title: 'Unflinching Feedback',
      desc: 'Honest, actionable identification of your candidate skill gaps before an interviewer catches you off guard.'
    }
  ];

  const milestones = [
    {
      date: 'Phase 1 • Genesis',
      title: 'Born From Real Placement Frustration',
      desc: 'Created by an ambitious student navigating the placement season, realizing that generic DSA platforms lacked job-description alignment.'
    },
    {
      date: 'Phase 2 • AI Engine Synthesis',
      title: 'Google Gemini Integration',
      desc: 'Engineered multi-dimensional prompt chains to extract recruiter intentions, sample answers, and skills gap diagnostics.'
    },
    {
      date: 'Phase 3 • Full Advisory Expansion (v2.0)',
      title: 'The Obsidian & Gold Consultancy Edition',
      desc: 'Elevated from a simple dashboard to a luxury career platform with ATS resume exports, structured roadmaps, and candidate feedback.'
    }
  ];

  return (
    <div className="marketing-about">
      <SEO 
        title="About Us — GetYourDestination | Our Mission & Story" 
        description="Learn why GetYourDestination was built: to democratize executive-level interview strategy and empower candidates with tailored AI intelligence."
      />

      <Navbar />

      <motion.main initial="hidden" animate="visible" variants={containerVariants}>
        {/* Hero Section */}
        <section className="about-hero">
          <div className="about-glow" />
          <div className="container-fluid">
            <motion.div variants={itemVariants}>
              <span className="gold-badge" style={{ marginBottom: '1.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.4rem 1rem' }}>
                <img src="/logo-icon.png" alt="GetYourDestination" style={{ width: 18, height: 18, borderRadius: 3, objectFit: 'cover' }} />
                <span>Our Story & Mission</span>
              </span>
            </motion.div>
            <motion.h1 variants={itemVariants}>
              Elevating Candidate Preparation <br />
              <span className="gold-gradient">Into An Unfair Advantage</span>
            </motion.h1>
            <motion.p variants={itemVariants}>
              We believe elite interview coaching should not be gated by $5,000 consultancy fees. GetYourDestination delivers executive precision to every driven candidate.
            </motion.p>
          </div>
        </section>

        {/* Origin Story Section */}
        <section className="story-section">
          <div className="container-fluid">
            <div className="story-grid">
              <motion.div className="story-text-column" variants={itemVariants}>
                <span className="section-tagline">The Founder's Journey</span>
                <h2>Why GetYourDestination Exists</h2>
                <p>
                  During university placement season, our founder faced the same challenge millions of candidates encounter: you spend hundreds of hours grinding generic algorithmic puzzles, yet freeze when an interviewer asks role-specific architectural trade-offs or behavioral nuance.
                </p>
                <p>
                  Job postings today are deeply specialized. A Frontend Engineer at Stripe requires radically different preparation than a Backend Engineer at Amazon. Generic preparation fails high-stakes opportunities.
                </p>
                <p>
                  GetYourDestination was engineered to solve this gap: an intelligent advisory tool that reads your specific resume, ingests the target company's job description, and synthesizes a high-precision strategy in 3 to 5 seconds.
                </p>

                <div className="founder-quote">
                  <blockquote>
                    “Every candidate deserves to walk into an interview room knowing precisely what will be asked, why it is being asked, and how to frame their answers for maximum impact.”
                  </blockquote>
                  <cite>— Founder & Lead Architect, GetYourDestination</cite>
                </div>
              </motion.div>

              <motion.div className="story-visual-card" variants={itemVariants}>
                <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                  <img 
                    src="/logo.png" 
                    alt="GetYourDestination — Careers with Clarity" 
                    style={{ maxHeight: '110px', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 6px 18px rgba(201,162,39,0.35))' }} 
                  />
                </div>
                <span className="gold-badge mission-badge">
                  <ShieldCheck size={13} /> The Core Mandate
                </span>
                <h3 className="mission-title">Democratizing Elite Advisory Intelligence</h3>
                <p className="mission-desc">
                  The iconic Golden <strong>G</strong> with an ascending road and star-crested arrow embodies your career trajectory: transforming ambiguity into unflinching clarity and purposeful momentum.
                </p>
                <div className="mission-stats-strip">
                  <div className="mini-stat">
                    <span className="num">10,000+</span>
                    <span className="lbl">Strategies Synthesized</span>
                  </div>
                  <div className="mini-stat">
                    <span className="num">94.8%</span>
                    <span className="lbl">Candidate Confidence Rate</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Who It's For Section */}
        <section className="audience-section">
          <div className="container-fluid">
            <div className="section-header">
              <span className="section-tagline">Designed For Ambition</span>
              <h2>Who GetYourDestination Is Built For</h2>
              <p>Whether taking your first corporate step or negotiating a principal leadership title.</p>
            </div>

            <div className="audience-grid">
              {audienceSegments.map((segment, idx) => {
                const Icon = segment.icon;
                return (
                  <motion.div key={idx} className="audience-card" variants={itemVariants}>
                    <div className="audience-icon">
                      <Icon size={22} />
                    </div>
                    <h3>{segment.title}</h3>
                    <p>{segment.desc}</p>
                    <div className="audience-tags">
                      {segment.tags.map((tag, tIdx) => (
                        <span key={tIdx}>{tag}</span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4 Pillars Section */}
        <section className="pillars-section">
          <div className="container-fluid">
            <div className="section-header">
              <span className="section-tagline">Guiding Philosophy</span>
              <h2>The Four Advisory Pillars</h2>
              <p>The core principles behind every report synthesized by our engine.</p>
            </div>

            <div className="pillars-grid">
              {pillars.map((pillar, idx) => (
                <motion.div key={idx} className="pillar-card" variants={itemVariants}>
                  <span className="pillar-number">{pillar.number}</span>
                  <h4>{pillar.title}</h4>
                  <p>{pillar.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="timeline-section">
          <div className="container-fluid">
            <div className="section-header">
              <span className="section-tagline">Evolution</span>
              <h2>Our Roadmap & Milestones</h2>
              <p>From a dormitory prototype to an elevated Obsidian & Gold interview advisory suite.</p>
            </div>

            <div className="timeline-track">
              {milestones.map((item, idx) => (
                <motion.div key={idx} className="timeline-node" variants={itemVariants}>
                  <span className="timeline-date">{item.date}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </motion.main>

      <Footer />
    </div>
  );
}
