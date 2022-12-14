import React from 'react';
import styles from '../../index.css';

// * restProps parameter is the collection props
export const ClapCount = ({ count, setRef, ...restProps }) => (
  <span 
    ref={setRef} 
    className={styles.count}
    {...restProps}
  >
    + {count}
  </span>
)