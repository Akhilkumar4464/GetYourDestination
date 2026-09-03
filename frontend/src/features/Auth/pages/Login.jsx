import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../../../context/ToastContext';
import Button from '../../../components/common/Button';
import SEO from '../../../components/common/SEO';
import AuthPitchPanel from '../components/AuthPitchPanel';
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';

import '../auth.form.scss';

export default function Login() {
  const { loading, handleLogin } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter both email and password', 'error');
      return;
    }

    const success = await handleLogin({ email, password });
    if (success) {
      showToast('Welcome back! Loading your career dashboard...', 'success');
      navigate('/');
    } else {
      showToast('Invalid email or password. Please try again.', 'error');
    }
  };

  const handleDemoLogin = async () => {
    setEmail('demo.candidate@getyourdestination.com');
    setPassword('demo12345');
    showToast('Demo credentials prefilled! Signing in...', 'info');
    
    // Attempt login with demo credentials
    const success = await handleLogin({ 
      email: 'demo.candidate@getyourdestination.com', 
      password: 'demo12345' 
    });

    if (success) {
      showToast('Demo workspace loaded successfully!', 'success');
      navigate('/');
    } else {
      // If demo user doesn't exist on this local db yet, inform user
      showToast('Demo credentials inserted into form. Please create this account if testing on a fresh database.', 'info');
    }
  };

  return (
    <div className="auth-page">
      <SEO 
        title="Sign In — GetYourDestination v2" 
        description="Sign in to your GetYourDestination account to access AI interview strategies and ATS resumes." 
      />

      <motion.div 
        className="auth-split-layout"
        initial={{ opacity: 0, y: 15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {/* Left Pitch Showcase */}
        <AuthPitchPanel />

        {/* Right Auth Form */}
        <div className="auth-form-panel">
          <div className="form-wrapper">
            <div className="form-header">
              <div className="mobile-brand-logo">
                <div className="brand-icon-wrapper-sm">
                  <Sparkles size={16} />
                </div>
                <span className="brand-name">GetYourDestination</span>
              </div>
              <h1>Welcome Back</h1>
              <p className="form-subtitle">Enter your credentials to access your interview workspace</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form-body">
              <div className="form-field-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-with-icon">
                  <Mail size={18} className="field-icon" />
                  <input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="candidate@company.com"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="form-field-group">
                <label htmlFor="password">Password</label>
                <div className="input-with-icon">
                  <Lock size={18} className="field-icon" />
                  <input
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••••••"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="eye-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                loading={loading}
                variant="glow"
                size="lg"
                iconPosition="right"
                icon={ArrowRight}
                style={{ width: '100%', marginTop: '0.5rem' }}
              >
                Sign In to Workspace
              </Button>

              {/* 1-Click Demo Evaluation Login */}
              <div className="demo-account-box">
                <div className="demo-info">
                  <span className="demo-title">Pitch / Demo Mode</span>
                  <span className="demo-desc">Quick 1-click evaluation test</span>
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleDemoLogin}
                  loading={loading}
                >
                  Prefill Demo
                </Button>
              </div>
            </form>

            <p className="auth-footer-prompt">
              New to GetYourDestination? <Link to="/register">Create an account</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
