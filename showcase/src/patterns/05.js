// ! Control Props
import React from 'react';
import { MediumClap, ShowInformationCount } from './control-props/components';
import { useControlledProps } from './control-props/hooks';
import userCustomStyles from './usage.css';

const Usage = () => {
  const { state, count, handleClap } = useControlledProps();

  return (
    <div>
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

      <ShowInformationCount state={state} count={count} />
    </div>
  )
}

export default Usage;