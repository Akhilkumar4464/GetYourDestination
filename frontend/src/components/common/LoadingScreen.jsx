import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function LoadingScreen({ message = "Initializing GetYourDestination v2.0..." }) {
  return (
    <div className="app-loading-container">
      <div className="loading-bg-glow" />
      <motion.div 
        className="loading-card glass"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="loading-brand-icon">
          <Sparkles size={28} className="loading-sparkle-icon" />
        </div>
        
        <div className="loading-spinner-ring" />

        <div className="loading-text-group">
          <h2 className="loading-title">GetYourDestination</h2>
          <p className="loading-message">{message}</p>
        </div>

        <div className="loading-progress-bar">
          <div className="loading-progress-fill" />
        </div>
      </motion.div>
    </div>
  );
}
