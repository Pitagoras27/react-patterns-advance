import React from 'react';
import styles from '../../index.css';

export const CountTotal = ({ countTotal, setRef, ...restProps }) => (
  <span 
    ref={setRef} 
    className={styles.total}
    {...restProps}
  >
    {countTotal}
  </span>
)