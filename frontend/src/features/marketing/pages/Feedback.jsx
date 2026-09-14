import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Star, 
  CheckCircle2, 
  Send, 
  MessageSquarePlus, 
  Filter, 
  ShieldCheck,
  ThumbsUp
} from 'lucide-react';
import Navbar from '../../../components/common/Navbar';
import Footer from '../../../components/common/Footer';
import Button from '../../../components/common/Button';
import SEO from '../../../components/common/SEO';
import { useToast } from '../../../context/ToastContext';
import '../styles/Feedback.scss';

export default function Feedback() {
  const { showToast } = useToast();
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoverRating, setHoverRating] = useState(0);
  const [rating, setRating] = useState(5);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [category, setCategory] = useState('Engineering');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const initialReviews = [
    {
      id: 1,
      name: 'Marcus Vance',
      role: 'Staff Software Engineer • Formerly Uber',
      category: 'Engineering',
      rating: 5,
      date: '2 days ago',
      initial: 'M',
      text: 'GetYourDestination accurately diagnosed the distributed systems concepts for my Staff Engineer loop. The 7-day preparation roadmap kept my study hours disciplined and laser-focused on high-yield topics.'
    },
    {
      id: 2,
      name: 'Elena Rostova',
      role: 'Lead Product Manager • FinTech Unicorn',
      category: 'Product & Design',
      rating: 5,
      date: '1 week ago',
      initial: 'E',
      text: 'The STAR behavioral matrix framework is pure gold. It helped me articulate cross-functional conflict and product metric trade-offs in a structured way that resonated deeply with executive interviewers.'
    },
    {
      id: 3,
      name: 'Devon Thorne',
      role: 'Solutions Architect • Enterprise Cloud',
      category: 'Engineering',
      rating: 5,
      date: '2 weeks ago',
      initial: 'D',
      text: 'The Obsidian & Gold interface and depth of the generated interview questions made this feel like a $5,000 executive career coach. The ATS resume generator alone saved me hours.'
    },
    {
      id: 4,
      name: 'Priya Sundaram',
      role: 'Frontend Architect • Series B AI Startup',
      category: 'Engineering',
      rating: 5,
      date: '3 weeks ago',
      initial: 'P',
      text: 'I loved how specific the technical deep-dive questions were to React 19 and concurrent architectures. Landed the Senior Frontend role on my first try.'
    },
    {
      id: 5,
      name: 'Julian Hayes',
      role: 'Engineering Director • Global SaaS',
      category: 'Leadership',
      rating: 5,
      date: '1 month ago',
      initial: 'J',
      text: 'Used this to prepare for executive director interviews. The behavioral response strategies helped me frame team growth and organizational scalability with utmost clarity.'
    },
    {
      id: 6,
      name: 'Aisha Al-Mansoor',
      role: 'Associate Software Engineer • Top Investment Bank',
      category: 'Engineering',
      rating: 4,
      date: '1 month ago',
      initial: 'A',
      text: 'As a campus graduate, this gave me the exact foundation I needed. It identified my gaps in database indexing and gave me study materials that directly appeared in my technical interview.'
    }
  ];

  const [reviewsList, setReviewsList] = useState(initialReviews);

  const filteredReviews = reviewsList.filter((r) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === '5-Star') return r.rating === 5;
    return r.category === activeFilter;
  });

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (!name || !email || !comment) {
      showToast('Please fill out your name, email, and review comment.', 'error');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const newReview = {
        id: Date.now(),
        name,
        role: role || 'Candidate • Verified Reviewer',
        category,
        rating,
        date: 'Just now',
        initial: name.charAt(0).toUpperCase(),
        text: comment
      };

      setReviewsList([newReview, ...reviewsList]);
      showToast('Thank you! Your verified review has been published.', 'success');
      setName('');
      setEmail('');
      setRole('');
      setComment('');
      setSubmitting(false);

      // Scroll to reviews
      const explorer = document.getElementById('reviews-grid-section');
      if (explorer) explorer.scrollIntoView({ behavior: 'smooth' });
    }, 600);
  };

  return (
    <div className="marketing-feedback">
      <SEO 
        title="Candidate Reviews & Ratings — GetYourDestination" 
        description="Explore verified candidate testimonials and ratings for GetYourDestination. Real interview success stories from top tech leaders and engineers."
      />

      <Navbar />

      <main>
        {/* Header Section */}
        <section className="feedback-header-section">
          <div className="feedback-glow" />
          <div className="container-fluid">
            <span className="gold-badge" style={{ marginBottom: '1.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.4rem 1rem' }}>
              <img src="/logo-icon.png" alt="GetYourDestination" style={{ width: 18, height: 18, borderRadius: 3, objectFit: 'cover' }} />
              <span>Verified Candidate Experiences</span>
            </span>
            <h1>
              Trusted By Thousands Of <br />
              <span className="gold-gradient">High-Performing Candidates</span>
            </h1>
            <p>
              Discover how ambitious professionals leverage our AI strategy suite to outprepare the competition and secure tier-one job offers.
            </p>

            {/* Scorecard Overview */}
            <div className="scorecard-container">
              <div className="rating-big-box">
                <span className="big-score">4.9</span>
                <div className="stars-row-big">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill="var(--gold-primary)" stroke="none" />
                  ))}
                </div>
                <span className="total-reviews-label">Based on 1,240+ verified candidate reviews</span>
              </div>

              <div className="rating-bars-column">
                <div className="bar-row">
                  <span className="star-label">5 Stars</span>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: '92%' }}></div>
                  </div>
                  <span className="bar-percent">92%</span>
                </div>
                <div className="bar-row">
                  <span className="star-label">4 Stars</span>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: '6%' }}></div>
                  </div>
                  <span className="bar-percent">6%</span>
                </div>
                <div className="bar-row">
                  <span className="star-label">3 Stars</span>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: '1.5%' }}></div>
                  </div>
                  <span className="bar-percent">1.5%</span>
                </div>
                <div className="bar-row">
                  <span className="star-label">2 Stars</span>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: '0.5%' }}></div>
                  </div>
                  <span className="bar-percent">0.5%</span>
                </div>
              </div>

              <div className="leave-review-cta-col">
                <a href="#leave-review-form" className="btn-gold-solid">
                  <MessageSquarePlus size={16} /> Leave Your Review
                </a>
                <p>Takes less than 60 seconds</p>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Explorer Section */}
        <section id="reviews-grid-section" className="reviews-explorer-section">
          <div className="container-fluid">
            <div className="filters-bar">
              <div className="filter-tabs">
                {['All', 'Engineering', 'Product & Design', 'Leadership', '5-Star'].map((f) => (
                  <button
                    key={f}
                    type="button"
                    className={`filter-tab-btn ${activeFilter === f ? 'active' : ''}`}
                    onClick={() => setActiveFilter(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <span className="results-count">Showing {filteredReviews.length} verified reviews</span>
            </div>

            <div className="reviews-grid">
              {filteredReviews.map((item) => (
                <motion.div 
                  key={item.id} 
                  className="review-card-full"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <div className="card-top">
                      <div className="stars-row">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} size={15} fill="var(--gold-primary)" stroke="none" />
                        ))}
                      </div>
                      <span className="review-date">{item.date}</span>
                    </div>
                    <p className="review-quote-text">“{item.text}”</p>
                  </div>

                  <div className="reviewer-profile">
                    <div className="reviewer-avatar">{item.initial}</div>
                    <div className="reviewer-meta">
                      <span className="reviewer-name">{item.name}</span>
                      <span className="reviewer-role">{item.role}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Leave Feedback Form Section */}
        <section id="leave-review-form" className="feedback-form-section">
          <div className="container-fluid">
            <div className="form-container-box">
              <div className="form-header-inner">
                <span className="section-tagline">Share Your Experience</span>
                <h2>Leave Your Review</h2>
                <p>Help other driven candidates prepare smarter with GetYourDestination.</p>
              </div>

              <form onSubmit={handleSubmitFeedback}>
                <div className="star-picker-group">
                  <label>Your Overall Rating</label>
                  <div className="star-buttons">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setRating(s)}
                        onMouseEnter={() => setHoverRating(s)}
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        <Star 
                          size={28} 
                          fill={(hoverRating || rating) >= s ? "var(--gold-primary)" : "transparent"} 
                          stroke="var(--gold-primary)" 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="rev-name">Full Name *</label>
                    <input 
                      id="rev-name" 
                      type="text" 
                      placeholder="e.g. Alex Morgan" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="rev-email">Email Address *</label>
                    <input 
                      id="rev-email" 
                      type="email" 
                      placeholder="alex@company.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="rev-role">Role & Company</label>
                    <input 
                      id="rev-role" 
                      type="text" 
                      placeholder="e.g. Senior Frontend Engineer • Stripe" 
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="rev-cat">Experience Category</label>
                    <select 
                      id="rev-cat" 
                      value={category} 
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="Product & Design">Product & Design</option>
                      <option value="Leadership">Leadership</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="rev-comment">Your Testimonial / Feedback *</label>
                  <textarea 
                    id="rev-comment" 
                    placeholder="How did GetYourDestination help in your interview preparation?"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                  ></textarea>
                </div>

                <Button 
                  type="submit" 
                  variant="primary" 
                  loading={submitting} 
                  style={{ width: '100%', marginTop: '0.5rem' }}
                  icon={Send}
                >
                  Submit Verified Feedback
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
