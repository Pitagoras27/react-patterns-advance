// ! State initializer
import React, { useState } from 'react';
import { useClapAnimation, useClapState, useDOMRef, useEffectAfterMount } from './hooks';
import { ClapContainer, ClapCount, ClapIcon, CountTotal } from './state-initializer/components';
import { USER_INITIAL_STATE } from './state-initializer/config';
import { useUpdateResetCount } from './state-initializer/hooks';
import { getTogglerProps } from './state-initializer/utils';
import userStyles from './usage.css';

const Usage = () => {
  const { 
    clapState, 
    counterProps,
    updateClapState,
    setClapState
  } = useClapState(USER_INITIAL_STATE)
  const { count, countTotal, isClicked } = clapState
  const [{ clapRef, clapCountRef, clapCountTotalRef }, setRef] = useDOMRef()

  const { reset, resetDep } = useUpdateResetCount({ count, setClapState, USER_INITIAL_STATE });

  const animationTimeline = useClapAnimation({
    clapEl: clapRef, 
    clapCountEl: clapCountRef, 
    clapCountTotalEl: clapCountTotalRef
  })

  useEffectAfterMount(() => {
    animationTimeline.replay()
  }, [count])

  const [uploadingReset, setUpload] = useState(false)
  useEffectAfterMount(() => {
    setUpload(true)

    const id = setTimeout(() => {
      setUpload(false)
    }, 1500)

    return () => clearTimeout(id)
  }, [resetDep])

  const handleClick = () => console.log("CLICKED!!!")

  // use case 1: user can change 'aria-pressed' value in props
  // use case 2: user can pass in onClick handler
  return (
    <div>
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
          {...counterProps()}
        />
        <CountTotal 
          countTotal={countTotal}
          setRef={setRef}
          data-refkey="clapCountTotalRef" />
      </ClapContainer>
      <section>
        <button 
          onClick={reset} 
          className={userStyles.resetBtn}
          disabled={uploadingReset}
        >
          reset
        </button>
        <pre className={userStyles.resetMsg}>
          {JSON.stringify({count, countTotal, isClicked})}
        </pre>
        <pre className={userStyles.resetMsg}>
          { uploadingReset ? `uploading reset ${resetDep} ...` : '' }
        </pre>
      </section>
    </div>
    
  )
}

export default Usage
