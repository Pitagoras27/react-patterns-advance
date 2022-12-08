// ! Props getters
import React from 'react';
import { ClapContainer, ClapCount, ClapIcon, CountTotal } from './getter-props/components';
import { INITIAL_STATE } from './getter-props/config';
import { getTogglerProps } from './getter-props/utils';
import { useClapAnimation, useClapState, useDOMRef, useEffectAfterMount } from './hooks';

const Usage = () => {
  const {
    clapState,
    updateClapState,
    counterProps 
  } = useClapState( INITIAL_STATE );
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

  const handleClick = () => console.log("CLICKED!!!")

  return (
    <ClapContainer 
      setRef={setRef}    
      data-refkey="clapRef"
      {...getTogglerProps({
        'aria-pressed': false,
        onClick: handleClick,
        updateClapState,
        clapState
      })}
    >
      <ClapIcon isClicked={isClicked} />
      <ClapCount 
        setRef={setRef}
        data-refkey="clapCountRef" 
        {...counterProps({ 'aria-hidden': false })}
      />
      <CountTotal 
        countTotal={countTotal}
        setRef={setRef}
        data-refkey="clapCountTotalRef" />
    </ClapContainer>
  )
}

export default Usage
