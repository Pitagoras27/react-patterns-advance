import React from "react";
import styles from '../../index.css';
import { INITIAL_STATE, MAXIMUM_USER_CLAP } from '../config';
import { MediumClapContext } from "../context/MediumClapContext";
import { useClapState } from "../hooks";

const { Provider } = MediumClapContext

export const MediumClap = ({ children,  onClap }) => {
  const { memoizedValue, setRef, handleClapClick } = useClapState(INITIAL_STATE, onClap, MAXIMUM_USER_CLAP);

  return (
    <Provider value={memoizedValue}>
      <button 
        ref={setRef} 
        data-refkey="clapRef"
        onClick={handleClapClick}
        className={styles.clap}
      >
        {children}
      </button>
    </Provider>
  )
}
