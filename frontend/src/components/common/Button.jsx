import React from 'react';
import { motion } from 'framer-motion';
import styles from './Button.module.css';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  size = 'md',
  loading = false, 
  disabled = false,
  className = '',
  icon: Icon,
  iconPosition = 'left',
  style = {},
  ...props 
}) => {
  const variants = {
    hover: { translateY: -1.5, transition: { duration: 0.15 } },
    tap: { scale: 0.98, translateY: 0 }
  };

  const btnClasses = [
    styles.btn,
    styles[variant] || styles.primary,
    styles[size] || styles.md,
    loading ? styles.loading : '',
    disabled ? styles.disabled : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      variants={disabled || loading ? {} : variants}
      whileHover={disabled || loading ? undefined : "hover"}
      whileTap={disabled || loading ? undefined : "tap"}
      className={btnClasses}
      style={style}
      {...props}
    >
      <div className={styles.content}>
        {loading ? (
          <>
            <div className={styles.spinner}></div>
            <span>{typeof children === 'string' ? children : 'Processing...'}</span>
          </>
        ) : (
          <>
            {Icon && iconPosition === 'left' && (
              <Icon className={styles.icon} size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
            )}
            {children && <span>{children}</span>}
            {Icon && iconPosition === 'right' && (
              <Icon className={styles.icon} size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
            )}
          </>
        )}
      </div>
      {variant === 'primary' || variant === 'glow' ? <div className={styles.shine}></div> : null}
    </motion.button>
  );
};

export default Button;
