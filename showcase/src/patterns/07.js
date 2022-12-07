// ! Props Collection
import React from 'react';
import { useClapAnimation, useClapState, useDOMRef, useEffectAfterMount } from './hooks';
import { ClapContainer, ClapCount, ClapIcon, CountTotal } from './props-collection/components';
import { INITIAL_STATE } from './props-collection/config';

const Usage = () => {
  const { 
    clapState, 
    togglerProps, 
    counterProps 
  } = useClapState(INITIAL_STATE);

  const { count, countTotal, isClicked } = clapState

  const [{ clapRef, clapCountRef, clapCountTotalRef }, setRef] = useDOMRef()

  const animationTimeline = useClapAnimation({
    clapEl: clapRef, 
    clapCountEl: clapCountRef, 
    clapCountTotalEl: clapCountTotalRef
  })

  useEffectAfterMount(() => {
    animationTimeline.replay()
  }, [count])

  return (
    <ClapContainer 
      setRef={setRef}    
      data-refkey="clapRef"
      {...togglerProps}
    >
      <ClapIcon isClicked={isClicked} />
      <ClapCount 
        setRef={setRef}
        data-refkey="clapCountRef" 
        {...counterProps}
      />
      <CountTotal 
        countTotal={countTotal}
        setRef={setRef}
        data-refkey="clapCountTotalRef" />
    </ClapContainer>
  )
}

export default Usage
