// ! Reusable Styles
import React from 'react';
import { MediumClap, ShowInformationCount } from './reusable-styles/components';
import { useShowInformation } from './reusable-styles/hooks';
import userCustomStyles from './usage.css';

const Usage = () => {
  const { count, handleClap } = useShowInformation();

  return (
    <div style={{ width: '100%' }}>
      <MediumClap 
        onClap={handleClap} 
        className={userCustomStyles.clap}
        style={{backgroundColor: 'navajowhite'}}
      >
        <MediumClap.Icon className={userCustomStyles.icon} />
        <MediumClap.Count className={userCustomStyles.count} />
        <MediumClap.CountTotal className={userCustomStyles.total} />
      </MediumClap>
      <ShowInformationCount count={count} />
    </div>
  )
}

export default Usage