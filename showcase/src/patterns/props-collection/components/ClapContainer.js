import React from 'react';
import styles from '../../index.css';

// * restProps parameter is the collection props
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
