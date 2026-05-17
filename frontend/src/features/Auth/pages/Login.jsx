import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import Button from '../../../components/common/Button';
import SEO from '../../../components/common/SEO';

import '../auth.form.scss';

export default function Login() {
  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleLogin({ email, password });
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="auth-page">
      <SEO title="Login" description="Login to your GetYourDestination account to access your interview strategies." />
      
      <motion.div 
        className="form-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1>Welcome Back</h1>
          <p className="form-subtitle">Enter your credentials to access your dashboard</p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="name@company.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          <Button 
            type="submit" 
            loading={loading}
            variant="primary"
          >
            Sign In
          </Button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Create one for free</Link>
        </p>
      </motion.div>
    </div>
  );
}


