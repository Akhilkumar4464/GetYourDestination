import React from 'react';
import { motion } from 'framer-motion';
import styles from './Button.module.css';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  loading = false, 
  disabled = false,
  className = '',
  icon: Icon,
  ...props 
}) => {
  const variants = {
    hover: { scale: 1.02, translateY: -2 },
    tap: { scale: 0.98, translateY: 0 }
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      variants={variants}
      whileHover="hover"
      whileTap="tap"
      className={`${styles.btn} ${styles[variant]} ${className} ${loading ? styles.loading : ''}`}
      {...props}
    >
      <div className={styles.content}>
        {loading ? (
          <div className={styles.spinner}></div>
        ) : (
          <>
            {Icon && <Icon className={styles.icon} />}
            <span>{children}</span>
          </>
        )}
      </div>
      <div className={styles.shine}></div>
    </motion.button>
  );
};

export default Button;
