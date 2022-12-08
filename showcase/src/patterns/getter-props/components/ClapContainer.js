import React from 'react';
import styles from '../../index.css';

export const ClapContainer = ({ children, setRef, handleClick, ...restProps }) => (
  <button 
    ref={setRef}
    className={styles.clap} 
    onClick={handleClick}
    {...restProps}
  >
    {children}
  </button>
)