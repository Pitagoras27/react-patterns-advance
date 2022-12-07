import React from 'react';
import { CupBase, CupBowl, CupHandle, Stream } from './custom-hooks/components';
import { useAnimateCup } from './custom-hooks/hooks';
import userStyles from './usage.css';

const Usage = () => {
  const { handleClick } = useAnimateCup();

  return (
    <section className={userStyles.cupContainer}>
      <div className={userStyles.cupStream}>
        <Stream />
      </div>
      <div id='coffee' style={{ fontSize: '0.5rem' }}>
        coffee
      </div>
      <div className={userStyles.cupBody}>
        <CupHandle />
        <CupBowl />
      </div>
      <div>
        <CupBase />
      </div>
      <footer>
        <button onClick={handleClick}>Animate</button>
      </footer>
    </section>
  )
}

export default Usage
