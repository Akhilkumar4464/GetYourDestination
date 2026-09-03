import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../features/Auth/hooks/useAuth';
import { 
  Sparkles, 
  Compass, 
  LogOut, 
  User, 
  Menu, 
  X, 
  PlusCircle, 
  Layers, 
  CheckCircle2, 
  ChevronDown,
  FileText,
  ShieldCheck
} from 'lucide-react';
import Button from './Button';

export default function Navbar({ onOpenNewStrategy }) {
  const { user, handleLogout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/', icon: Compass },
  ];

  const isCurrent = (path) => location.pathname === path;

  return (
    <header className="site-navbar-wrapper">
      <div className="site-navbar container-fluid">
        {/* Brand / Logo */}
        <Link to="/" className="navbar-brand">
          <div className="brand-icon-wrapper">
            <Sparkles className="brand-icon" size={20} />
          </div>
          <div className="brand-text-group">
            <span className="brand-name">GetYourDestination</span>
            <span className="brand-badge">v2.0 PRO</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isCurrent(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${active ? 'active' : ''}`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
                {active && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="nav-active-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Section Actions & User */}
        <div className="navbar-right">
          <div className="engine-status-tag hide-on-mobile">
            <span className="pulse-dot"></span>
            <span>Gemini AI 2.5</span>
          </div>

          {user ? (
            <div className="user-menu-container">
              <button
                type="button"
                className="user-profile-trigger"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                aria-expanded={profileDropdownOpen}
              >
                <div className="user-avatar-small">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="user-meta-compact hide-on-mobile">
                  <span className="user-name-compact">{user.name || 'User'}</span>
                  <span className="user-role-tag">Candidate</span>
                </div>
                <ChevronDown size={14} className={`dropdown-arrow ${profileDropdownOpen ? 'rotated' : ''}`} />
              </button>

              <AnimatePresence>
                {profileDropdownOpen && (
                  <>
                    <div 
                      className="dropdown-backdrop" 
                      onClick={() => setProfileDropdownOpen(false)} 
                    />
                    <motion.div
                      className="user-dropdown-menu glass"
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className="dropdown-header">
                        <p className="dropdown-user-name">{user.name}</p>
                        <p className="dropdown-user-email">{user.email}</p>
                      </div>
                      <div className="dropdown-divider" />
                      <div className="dropdown-stats-row">
                        <div className="dropdown-stat-item">
                          <span className="stat-label">Status</span>
                          <span className="stat-value text-success">
                            <ShieldCheck size={12} style={{ display: 'inline', marginRight: 4 }} />
                            Verified
                          </span>
                        </div>
                        <div className="dropdown-stat-item">
                          <span className="stat-label">Engine</span>
                          <span className="stat-value">Gemini Flash</span>
                        </div>
                      </div>
                      <div className="dropdown-divider" />
                      <button
                        type="button"
                        className="dropdown-item dropdown-logout-btn"
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          handleLogout();
                        }}
                      >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="auth-nav-buttons">
              <Link to="/login">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">Get Started</Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-in Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-drawer glass"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mobile-drawer-inner">
              <div className="mobile-user-card">
                {user ? (
                  <div className="mobile-user-info">
                    <div className="user-avatar-small">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                      <div className="mobile-user-name">{user.name}</div>
                      <div className="mobile-user-email">{user.email}</div>
                    </div>
                  </div>
                ) : (
                  <div className="mobile-auth-prompt">
                    <p>Welcome to GetYourDestination v2</p>
                    <div className="mobile-auth-actions">
                      <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" size="sm" style={{ width: '100%' }}>Sign In</Button>
                      </Link>
                      <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="primary" size="sm" style={{ width: '100%' }}>Register</Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <div className="mobile-nav-links">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isCurrent(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`mobile-nav-item ${active ? 'active' : ''}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              {user && (
                <div className="mobile-drawer-footer">
                  <Button
                    variant="danger-outline"
                    size="sm"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    icon={LogOut}
                    style={{ width: '100%' }}
                  >
                    Sign Out
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
