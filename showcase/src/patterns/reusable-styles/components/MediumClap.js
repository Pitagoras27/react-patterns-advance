import React from "react";
import styles from '../../index.css';
import { INITIAL_STATE, MAXIMUM_USER_CLAP } from '../config';
import { MediumClapContext } from "../context/MediumClapContext";
import { useClapState } from "../hooks";

const { Provider } = MediumClapContext

export const MediumClap = ({ 
  children, 
  onClap,
  style : userStyles = {}, 
  className 
}) => {
  const { memoizedValue, setRef, handleClapClick } = useClapState(INITIAL_STATE, onClap, MAXIMUM_USER_CLAP);
  const classNames = [styles.clap, className].join(' ').trim();

  return (
    <Provider value={memoizedValue}>
      <button 
        ref={setRef} 
        data-refkey="clapRef"
        className={classNames} 
        onClick={handleClapClick}
        style={userStyles}
      >
        {children}
      </button>
    </Provider>
  )
}
