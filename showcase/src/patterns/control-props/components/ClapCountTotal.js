import React, { useContext } from 'react';
import styles from '../../index.css';
import { MediumClapContext } from '../context/MediumClapContext';

export const ClapCountTotal = ({ style: userStyles = {}, className }) => {
  // Get prop from MediumClapContext instead from parent MediumClap
  const { countTotal, setRef } = useContext(MediumClapContext)
  const classNames = [styles.total, className].join(' ').trim()
  return (
    <span 
      ref={setRef} 
      data-refkey="clapCountTotalRef" 
      className={classNames}
      style={userStyles}
    >
      {countTotal}
    </span>
  )
}
