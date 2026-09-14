import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Mail, 
  MessageSquare, 
  Send, 
  ChevronDown, 
  Clock, 
  ShieldCheck, 
  CheckCircle2,
  Headphones,
  Globe
} from 'lucide-react';
import Navbar from '../../../components/common/Navbar';
import Footer from '../../../components/common/Footer';
import Button from '../../../components/common/Button';
import SEO from '../../../components/common/SEO';
import { useToast } from '../../../context/ToastContext';
import '../styles/Contact.scss';

export default function Contact() {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Career Strategy Inquiry');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const faqs = [
    {
      question: "How does GetYourDestination analyze job descriptions?",
      answer: "Our engine uses Google Gemini 2.5 models trained on engineering rubrics and recruiter scorecards. It parses the tech stack, seniority requirements, system design expectations, and organizational culture signals to build role-calibrated technical questions and STAR behavioral frameworks."
    },
    {
      question: "Is my resume data and job description kept confidential?",
      answer: "Absolutely. We adhere to stringent zero-retention enterprise standards. Your uploaded resumes and paste data are encrypted in transit and at rest, and are strictly used only for synthesizing your strategy report — never sold or used to train third-party public models."
    },
    {
      question: "How does the ATS Resume download feature work?",
      answer: "Once your strategy report is synthesized, you can download a clean, print-ready HTML resume directly tailored to the job description keywords and skill gaps. You can open it in any browser and use 'Save as PDF' (Ctrl+P / Cmd+P) for instantaneous submission."
    },
    {
      question: "Can I use GetYourDestination for non-technical roles?",
      answer: "Yes! While heavily optimized for Software Engineering, DevOps, and Data roles, GetYourDestination also synthesizes high-impact strategies for Product Managers, Technical Program Managers, Engineering Directors, and UI/UX Designers."
    },
    {
      question: "How accurate are the 7-Day Roadmaps?",
      answer: "The roadmaps prioritize your exact detected skill gaps against the core requirements of the job description, grouping topics from foundational concepts to advanced system design and behavioral rehearsal across a realistic 7-day timeline."
    },
    {
      question: "What is the expected support response time?",
      answer: "Our advisory team typically responds to candidate and enterprise inquiries within 12 to 24 hours on business days."
    }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please complete all required fields.', 'error');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      showToast('Message sent! An advisory specialist will respond within 24 hours.', 'success');
      setName('');
      setEmail('');
      setMessage('');
      setSubmitting(false);
    }, 600);
  };

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? -1 : idx);
  };

  return (
    <div className="marketing-contact">
      <SEO 
        title="Contact & Advisory Support — GetYourDestination" 
        description="Get in touch with GetYourDestination's interview advisory team or explore our frequently asked questions." 
      />

      <Navbar />

      <main>
        {/* Header Section */}
        <section className="contact-header">
          <div className="contact-glow" />
          <div className="container-fluid">
            <span className="gold-badge" style={{ marginBottom: '1.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.4rem 1rem' }}>
              <img src="/logo-icon.png" alt="GetYourDestination" style={{ width: 18, height: 18, borderRadius: 3, objectFit: 'cover' }} />
              <span>Advisory & Candidate Support</span>
            </span>
            <h1>
              We Are Here To Assist Your <br />
              <span className="gold-gradient">Career Trajectory</span>
            </h1>
            <p>
              Have questions about our AI strategy engine, enterprise candidate licenses, or need custom interview preparation guidance? Reach out below.
            </p>
          </div>
        </section>

        {/* Dual Column Layout: Info + Contact Form */}
        <section className="contact-main-grid">
          <div className="container-fluid">
            <div className="layout-columns">
              {/* Left Column: Direct Support Channels */}
              <div className="contact-info-panel">
                <div className="info-header">
                  <span className="section-tagline">Direct Channels</span>
                  <h2>Consultancy Concierge</h2>
                  <p>
                    Our advisory specialists and engineers are available to support your career growth and platform experience.
                  </p>
                </div>

                <div className="contact-cards-stack">
                  <div className="contact-card-item">
                    <div className="card-icon-box">
                      <Mail size={20} />
                    </div>
                    <div className="card-details">
                      <h4>Advisory & Inquiries</h4>
                      <a href="mailto:advisory@getyourdestination.com" className="contact-link">
                        advisory@getyourdestination.com
                      </a>
                      <span className="contact-hint">Response within 12–24 business hours</span>
                    </div>
                  </div>

                  <div className="contact-card-item">
                    <div className="card-icon-box">
                      <Clock size={20} />
                    </div>
                    <div className="card-details">
                      <h4>Support Hours</h4>
                      <span className="contact-link" style={{ color: 'var(--text-main)' }}>
                        Monday – Friday • 9:00 AM – 7:00 PM IST
                      </span>
                      <span className="contact-hint">Global candidate coverage</span>
                    </div>
                  </div>

                  <div className="contact-card-item">
                    <div className="card-icon-box">
                      <Globe size={20} />
                    </div>
                    <div className="card-details">
                      <h4>Headquarters & Operations</h4>
                      <span className="contact-link" style={{ color: 'var(--text-main)' }}>
                        Global AI Strategy Division • Cloud Native
                      </span>
                      <span className="contact-hint">Serving candidates across 30+ countries</span>
                    </div>
                  </div>
                </div>

                <div className="advisory-badge-box">
                  <ShieldCheck size={24} style={{ color: '#6EE7B7', flexShrink: 0 }} />
                  <p>
                    <strong>Confidentiality Guaranteed:</strong> All communication and career documents remain strictly private under our enterprise NDA standard.
                  </p>
                </div>
              </div>

              {/* Right Column: Interactive Form */}
              <div className="contact-form-panel">
                <span className="section-tagline">Send An Inquiry</span>
                <h3>Direct Message</h3>
                <p className="form-sub">Fill out the details below and an advisory representative will reach out.</p>

                <form onSubmit={handleSendMessage}>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label htmlFor="ct-name">Your Full Name *</label>
                      <input 
                        id="ct-name" 
                        type="text" 
                        placeholder="e.g. Jordan Reed" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required 
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="ct-email">Email Address *</label>
                      <input 
                        id="ct-email" 
                        type="email" 
                        placeholder="jordan@domain.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="ct-subject">Inquiry Topic</label>
                    <select 
                      id="ct-subject" 
                      value={subject} 
                      onChange={(e) => setSubject(e.target.value)}
                    >
                      <option value="Career Strategy Inquiry">Career Strategy & Preparation Inquiries</option>
                      <option value="Engine & Report Support">AI Engine & Strategy Report Support</option>
                      <option value="Resume Builder Question">ATS Resume Builder Questions</option>
                      <option value="Enterprise / Campus Licensing">Enterprise & University Campus Access</option>
                      <option value="Other">Other Advisory Assistance</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="ct-msg">Your Message *</label>
                    <textarea 
                      id="ct-msg" 
                      placeholder="Describe your inquiry, target company, or feedback in detail..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    loading={submitting} 
                    style={{ width: '100%', marginTop: '0.75rem' }}
                    icon={Send}
                  >
                    Send Confidential Inquiry
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section className="faq-section">
          <div className="container-fluid">
            <div className="section-header">
              <span className="section-tagline">Common Questions</span>
              <h2>Frequently Asked Questions</h2>
              <p>Everything you need to know about our interview intelligence platform.</p>
            </div>

            <div className="faq-accordion-container">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
                    <button 
                      type="button" 
                      className={`faq-trigger ${isOpen ? 'active' : ''}`}
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown size={18} className="faq-icon-arrow" />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="faq-answer-body">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
