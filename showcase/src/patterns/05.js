// ! Control Props
import React, { useState } from 'react';
import { MediumClap } from './control-props/components';
import styles from './index.css';
import userCustomStyles from './usage.css';

const INITIAL_STATE = {
  count: 0,
  countTotal: 2100,
  isClicked: false
}
const MAXIMUM_CLAP_VAL = 10

const Usage = () => {
  // expose count, countTotal and isClicked
  const [state, setState] = useState(INITIAL_STATE)
  const [count, setCount] = useState(0)
  const handleClap = (clapState) => {
    clapState 
    ? setCount(clapState.count) 
    : setState(({ count, countTotal }) => ({
      count:  Math.min(count + 1, MAXIMUM_CLAP_VAL),
      countTotal: count < MAXIMUM_CLAP_VAL ? countTotal + 1 : countTotal,
      isClicked: true
    }))
  }

  return (
    <div style={{ width: '100%' }}>
      <MediumClap 
        onClap={handleClap} 
        className={userCustomStyles.clap}
      >
        <MediumClap.Icon className={userCustomStyles.icon} />
        <MediumClap.Count className={userCustomStyles.icon} />
        <MediumClap.CountTotal className={userCustomStyles.icon} />
      </MediumClap>

      <MediumClap 
        onClap={handleClap} 
        className={userCustomStyles.clap}
        values={state}
      >
        <MediumClap.Icon className={userCustomStyles.icon} />
        <MediumClap.Count className={userCustomStyles.icon} />
        <MediumClap.CountTotal className={userCustomStyles.icon} />
      </MediumClap>

      <MediumClap 
        onClap={handleClap} 
        className={userCustomStyles.clap}
        values={state}
      >
        <MediumClap.Icon className={userCustomStyles.icon} />
        <MediumClap.Count className={userCustomStyles.icon} />
        <MediumClap.CountTotal className={userCustomStyles.icon} />
      </MediumClap>

      {!!count && (
        <div className={styles.info}>{`You have clapped internal count ${count} times`}</div>
      )}
      {!!state.count && (
        <div className={styles.info}>{`You have clapped user count ${state.count} times`}</div>
      )}
    </div>
  )
}

export default Usage;