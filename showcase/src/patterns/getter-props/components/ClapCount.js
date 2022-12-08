import React from 'react';
import styles from '../../index.css';

export const ClapCount = ({ count, setRef, ...restProps }) => (
  <span 
    ref={setRef} 
    className={styles.count}
    {...restProps}
  >
    + {count}
  </span>
)