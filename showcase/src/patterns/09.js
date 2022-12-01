// ! State initializer
import React, {
  useCallback, useEffect, useRef, useState
} from 'react';
import { useClapAnimation, useDOMRef, useEffectAfterMount } from './hooks';

import styles from './index.css';
import userStyles from './usage.css';

const INITIAL_STATE = {
  count: 0,
  countTotal: 267,
  isClicked: false
}

// use effect is never called until the return statement of the functional component is reached.
const usePrevious = value => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value // 2. then run use effect 
  }, [value])
  return ref.current  // 1. return 1st
}

// reference to:
// const handleClick = event => { ... }
// <button onClick={handleClick} />

// callFnsInSequence take in many functions (...fns)
// and return a function 
// (...args) => { fns.forEach(fn => fn && fn(...args)) }
// all arguements (...args) of functions e.g. event
const callFnsInSquence = (...fns) => (...args) => {
  fns.forEach(fn => fn && fn(...args))
}

const useClapState = (initialState = INITIAL_STATE) => {
  const MAXIMUM_USER_CLAP = 50
  const userInitialState = useRef(initialState)
  const [clapState, setClapState] = useState(initialState)
  const { count, countTotal } = clapState

  const updateClapState = useCallback(() => {
    setClapState(({ count, countTotal }) => ({
      count: Math.min(count + 1, MAXIMUM_USER_CLAP),
      countTotal: 
        count < MAXIMUM_USER_CLAP 
          ? countTotal + 1 
          : countTotal,
      isClicked: true,
    }))
  },[count, countTotal])

  // glorified counter
  const resetRef = useRef(0) // 0, 1, 2, 3, ...
  const prevCount = usePrevious(count)
  const reset = useCallback(() => {
    if(prevCount < count || prevCount === MAXIMUM_USER_CLAP) {
      setClapState(userInitialState.current)
      resetRef.current++
    }
  }, [prevCount, count, setClapState])

  const getTogglerProps = ({ onClick, ...otherProps }) => ({
    onClick: callFnsInSquence(updateClapState, onClick),
    'aria-pressed': clapState.isClicked,
    ...otherProps
  })

  const getCounterProps = ({ ...otherProps }) => ({
    count,
    'aria-valuemax': MAXIMUM_USER_CLAP,
    'aria-valuemin': 0,
    'aria-valuenow': count,
    ...otherProps
  })

  return { 
    clapState, 
    updateClapState, 
    getTogglerProps, 
    getCounterProps, 
    reset, 
    resetDep: resetRef.current
  }
}

const ClapContainer = ({ children, setRef, handleClick, ...restProps }) => {
  return (
    <button 
      ref={setRef}
      className={styles.clap} 
      onClick={handleClick}
      {...restProps}
    >
      {children}
    </button>
  )
}

const ClapIcon = ({ isClicked }) => (
  <span>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='-549 338 100.1 125'
      className={`${styles.icon} ${isClicked && styles.checked}`}
    >
      <path d='M-471.2 366.8c1.2 1.1 1.9 2.6 2.3 4.1.4-.3.8-.5 1.2-.7 1-1.9.7-4.3-1-5.9-2-1.9-5.2-1.9-7.2.1l-.2.2c1.8.1 3.6.9 4.9 2.2zm-28.8 14c.4.9.7 1.9.8 3.1l16.5-16.9c.6-.6 1.4-1.1 2.1-1.5 1-1.9.7-4.4-.9-6-2-1.9-5.2-1.9-7.2.1l-15.5 15.9c2.3 2.2 3.1 3 4.2 5.3zm-38.9 39.7c-.1-8.9 3.2-17.2 9.4-23.6l18.6-19c.7-2 .5-4.1-.1-5.3-.8-1.8-1.3-2.3-3.6-4.5l-20.9 21.4c-10.6 10.8-11.2 27.6-2.3 39.3-.6-2.6-1-5.4-1.1-8.3z' />
      <path d='M-527.2 399.1l20.9-21.4c2.2 2.2 2.7 2.6 3.5 4.5.8 1.8 1 5.4-1.6 8l-11.8 12.2c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l34-35c1.9-2 5.2-2.1 7.2-.1 2 1.9 2 5.2.1 7.2l-24.7 25.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l28.5-29.3c2-2 5.2-2 7.1-.1 2 1.9 2 5.1.1 7.1l-28.5 29.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.4 1.7 0l24.7-25.3c1.9-2 5.1-2.1 7.1-.1 2 1.9 2 5.2.1 7.2l-24.7 25.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l14.6-15c2-2 5.2-2 7.2-.1 2 2 2.1 5.2.1 7.2l-27.6 28.4c-11.6 11.9-30.6 12.2-42.5.6-12-11.7-12.2-30.8-.6-42.7m18.1-48.4l-.7 4.9-2.2-4.4m7.6.9l-3.7 3.4 1.2-4.8m5.5 4.7l-4.8 1.6 3.1-3.9' />
    </svg>
  </span>
)

const ClapCount = ({ count, setRef, ...restProps }) => (
  <span 
    ref={setRef} 
    className={styles.count}
    {...restProps}
  >
    + {count}
  </span>
)

const CountTotal = ({ countTotal, setRef, ...restProps }) => (
  <span 
    ref={setRef} 
    className={styles.total}
    {...restProps}
  >
    {countTotal}
  </span>
)

const userInitialState = {
  count: 0,
  countTotal: 1000,
  isClicked: false
}

const Usage = () => {
  const { 
    clapState, 
    updateClapState, 
    getTogglerProps, 
    getCounterProps,
    reset,
    resetDep
  } = useClapState(userInitialState)
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

  const [uploadingReset, setUpload] = useState(false)
  useEffectAfterMount(() => {
    setUpload(true)

    const id = setTimeout(() => {
      setUpload(false)
    }, 3000)

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
          onClick: handleClick
        })}
      >
        <ClapIcon isClicked={isClicked} />
        <ClapCount 
          setRef={setRef}
          data-refkey="clapCountRef" 
          {...getCounterProps()}
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
