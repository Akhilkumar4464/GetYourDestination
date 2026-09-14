import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../../../context/ToastContext';
import Button from '../../../components/common/Button';
import SEO from '../../../components/common/SEO';
import AuthPitchPanel from '../components/AuthPitchPanel';
import { User, Mail, Lock, Eye, EyeOff, Sparkles, UserPlus } from 'lucide-react';

import '../auth.form.scss';

export default function Register() {
  const navigate = useNavigate();
  const { loading, handleRegister } = useAuth();
  const { showToast } = useToast();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Compute password strength score (0 to 3)
  const getPasswordStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 6) score += 1;
    if (password.length >= 10 || (/[A-Z]/.test(password) && /[0-9]/.test(password))) score += 1;
    if (/[^A-Za-z0-9]/.test(password) && password.length >= 8) score += 1;
    return score;
  };

  const strengthScore = getPasswordStrength();
  const strengthLabels = ['Too weak', 'Fair strength', 'Good password', 'Strong & Secure'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    if (password.length < 6) {
      showToast('Password must be at least 6 characters.', 'error');
      return;
    }

    const success = await handleRegister({ name, email, password });
    if (success) {
      showToast('Account created successfully! Welcome to GetYourDestination.', 'success');
      navigate('/service');
    } else {
      showToast('Registration failed. Email may already be in use.', 'error');
    }
  };

  return (
    <div className="auth-page">
      <SEO 
        title="Create Account — GetYourDestination Executive Edition" 
        description="Create your GetYourDestination account and start mastering your upcoming interviews today." 
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
              <Link to="/" className="mobile-brand-logo">
                <div className="brand-icon-wrapper-sm">
                  <img src="/logo-icon.png" alt="GetYourDestination Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                </div>
                <span className="brand-name">GetYourDestination</span>
              </Link>
              <h1>Create Account</h1>
              <p className="form-subtitle">Unlock role-calibrated technical deep dives and STAR matrices</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form-body">
              <div className="form-field-group">
                <label htmlFor="reg-name">Full Name</label>
                <div className="input-with-icon">
                  <User size={18} className="field-icon" />
                  <input
                    id="reg-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Candidate Name"
                    autoComplete="name"
                    required
                  />
                </div>
              </div>

              <div className="form-field-group">
                <label htmlFor="reg-email">Email Address</label>
                <div className="input-with-icon">
                  <Mail size={18} className="field-icon" />
                  <input
                    id="reg-email"
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
                <label htmlFor="reg-password">Password</label>
                <div className="input-with-icon">
                  <Lock size={18} className="field-icon" />
                  <input
                    id="reg-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Minimum 6 characters"
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {password && (
                  <div className="password-strength-container">
                    <div className="strength-bars">
                      <div className={`strength-segment ${strengthScore >= 1 ? `active-${strengthScore}` : ''}`}></div>
                      <div className={`strength-segment ${strengthScore >= 2 ? `active-${strengthScore}` : ''}`}></div>
                      <div className={`strength-segment ${strengthScore >= 3 ? `active-${strengthScore}` : ''}`}></div>
                    </div>
                    <span className="strength-label">{strengthLabels[strengthScore]}</span>
                  </div>
                )}
              </div>

              <Button 
                type="submit" 
                loading={loading}
                variant="primary"
                size="lg"
                iconPosition="right"
                icon={UserPlus}
                style={{ width: '100%', marginTop: '0.5rem' }}
              >
                Create Account & Launch Studio
              </Button>
            </form>

            <div className="auth-form-footer">
              Already have an account? <Link to="/login">Sign In</Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
