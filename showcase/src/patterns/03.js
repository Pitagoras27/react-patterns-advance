// ! Compound Components
import React from 'react';
import { MediumClap, ShowInformationCount } from './compound-components/components';
import { useShowInformation } from './compound-components/hooks';

const Usage = () => {
  const { count, handleClap } = useShowInformation();

  return (
    <div style={{ width: '100%' }}>
      <MediumClap onClap={handleClap}>
        <MediumClap.Icon />
        <MediumClap.Count />
        <MediumClap.CountTotal />
      </MediumClap>
      <ShowInformationCount count={count} />
    </div>
  )
}

export default Usage
