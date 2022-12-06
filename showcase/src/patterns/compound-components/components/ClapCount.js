import React, { useContext } from 'react';
import styles from '../../index.css';
import { MediumClapContext } from '../context/MediumClapContext';

export const ClapCount = ({ style: userStyles = {}, className }) => {
  const { count, setRef } = useContext(MediumClapContext)
  const classNames = [styles.count, className].join(' ').trim()
  return (
    <span 
      ref={setRef} 
      data-refkey="clapCountRef" 
      className={classNames}
      style={userStyles}
    >
      + {count}
    </span>
  )
}
