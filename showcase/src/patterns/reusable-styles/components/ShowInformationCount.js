import React from 'react';
import styles from '../../index.css';

export const ShowInformationCount = ({ count }) => (
  <>
    { !!count && 
      (
        <div className={styles.info}>
          {`You have clapped internal count ${ count } times`}
        </div>
      )
    }
  </>
);
