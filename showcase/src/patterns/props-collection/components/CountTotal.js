import React from 'react';
import styles from '../../index.css';

// * restProps parameter is the collection props
export const CountTotal = ({ countTotal, setRef, ...restProps }) => (
  <span 
    ref={setRef} 
    className={styles.total}
    {...restProps}
  >
    {countTotal}
  </span>
)