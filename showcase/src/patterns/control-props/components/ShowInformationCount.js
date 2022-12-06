import React from 'react';
import styles from '../../index.css';

// TODO: This is inefficient. TO IMPROVE!!
export const ShowInformationCount = ({ count, state }) => {
  const isControlled = !!state.count;
  const nonControlled = !!count;
  return (
    <>
      { isControlled && 
        (
          <div className={styles.info}>
            {`You have clapped user count ${ state.count } times`}
          </div>
        )
      }

      { nonControlled && 
        (
          <div className={styles.info}>
            {`You have clapped internal count ${ count } times`}
          </div>
        )
      }
    </>
  )
}