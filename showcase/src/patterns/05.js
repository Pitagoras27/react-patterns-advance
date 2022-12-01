// ! Control Props
import React, {
  createContext, useCallback, useContext,
  useEffect, useMemo, useRef, useState
} from 'react';
import { useClapAnimation } from './hooks';
import styles from './index.css';
import userCustomStyles from './usage.css';

const initialState = {
  count: 0,
  countTotal: 267,
  isClicked: false
}

// MediumClapContext lets us pass a value deep into the tree of React components in MediumClap component
const MediumClapContext = createContext()

// Use a Provider to pass the current value to the tree below.
// Any component can read it, no matter how deep it is.
const { Provider } = MediumClapContext

// MediumClap component don’t know their children ahead of time. 
// Use the special children prop to pass children elements directly into MediumClap
const MediumClap = ({ 
  children, 
  onClap,
  // 1. add a values prop
  values = null,
  style : userStyles = {}, 
  className 
}) => {
  const MAXIMUM_USER_CLAP = 50
  const [clapState, setClapState] = useState(initialState)
  const { count, countTotal, isClicked } = clapState
  
  const [{ clapRef, clapCountRef, clapCountTotalRef }, setRefState] = useState({})
  const setRef = useCallback(node => {
    setRefState(prevRefState => ({
      ...prevRefState,
      [node.dataset.refkey]: node
    }))
  }, [])

  const animationTimeline = useClapAnimation({
    clapEl: clapRef, 
    clapCountEl: clapCountRef, 
    clapCountTotalEl: clapCountTotalRef
  })

  // default value is false
  // set to true when MediumClap is rendered
  const componentJustMounted = useRef(false)
  useEffect(() => {
    // 4. if not isControlled then use clapState
    if(componentJustMounted.current && !isControlled){
      // next time count changes
      console.log('onClap is called')
      onClap && onClap(clapState)
    } else {
      // set to true the first time in useEffect after rendered
      componentJustMounted.current = true
    }
  }, [count, onClap, isControlled])

  // 2. Controlled component ? onClap : setClapState
  const isControlled = !!values && onClap
  const handleClapClick = () => {
    animationTimeline.replay()
    isControlled 
      ? onClap() 
      : setClapState(prevState => ({
          count: Math.min(prevState.count + 1, MAXIMUM_USER_CLAP),
          countTotal: 
            count < MAXIMUM_USER_CLAP 
              ? prevState.countTotal + 1 
              : prevState.countTotal,
          isClicked: true,
        }))
  }

  // 3. Controlled component 
  // ? pass values to children 
  // : pass clapState to children 
  const getState = useCallback(
    () => isControlled ? values : clapState, 
    [isControlled, values, clapState]
  )

  // Returns a memoized state.
  const memoizedValue = useMemo(
    () => ({
      ...getState(), 
      setRef
    }), [getState, setRef]
  )

  // className -> 'clap-1234 classUser'
  const classNames = [styles.clap, className].join(' ').trim()

  return (
    // Accepts a value prop to be passed to consuming components that are descendants of this Provider.
    // MediumClap component don’t know their children ahead of time. 
    // Use the special children prop to pass children elements directly into MediumClap
    <Provider value={memoizedValue}>
      <button 
        ref={setRef} 
        data-refkey="clapRef"
        className={classNames} 
        onClick={handleClapClick}
        style={userStyles}
      >
        {children}
      </button>
    </Provider>
  )
}

const ClapIcon = ({ style: userStyles = {}, className }) => {
  // Get prop from MediumClapContext instead from parent MediumClap
  const { isClicked } = useContext(MediumClapContext)
  const classNames = 
  [styles.icon, isClicked ? styles.checked : '', className]
    .join(' ')
    .trim()
  return (
    <span>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='-549 338 100.1 125'
        className={classNames}
        style={userStyles}
      >
        <path d='M-471.2 366.8c1.2 1.1 1.9 2.6 2.3 4.1.4-.3.8-.5 1.2-.7 1-1.9.7-4.3-1-5.9-2-1.9-5.2-1.9-7.2.1l-.2.2c1.8.1 3.6.9 4.9 2.2zm-28.8 14c.4.9.7 1.9.8 3.1l16.5-16.9c.6-.6 1.4-1.1 2.1-1.5 1-1.9.7-4.4-.9-6-2-1.9-5.2-1.9-7.2.1l-15.5 15.9c2.3 2.2 3.1 3 4.2 5.3zm-38.9 39.7c-.1-8.9 3.2-17.2 9.4-23.6l18.6-19c.7-2 .5-4.1-.1-5.3-.8-1.8-1.3-2.3-3.6-4.5l-20.9 21.4c-10.6 10.8-11.2 27.6-2.3 39.3-.6-2.6-1-5.4-1.1-8.3z' />
        <path d='M-527.2 399.1l20.9-21.4c2.2 2.2 2.7 2.6 3.5 4.5.8 1.8 1 5.4-1.6 8l-11.8 12.2c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l34-35c1.9-2 5.2-2.1 7.2-.1 2 1.9 2 5.2.1 7.2l-24.7 25.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l28.5-29.3c2-2 5.2-2 7.1-.1 2 1.9 2 5.1.1 7.1l-28.5 29.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.4 1.7 0l24.7-25.3c1.9-2 5.1-2.1 7.1-.1 2 1.9 2 5.2.1 7.2l-24.7 25.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l14.6-15c2-2 5.2-2 7.2-.1 2 2 2.1 5.2.1 7.2l-27.6 28.4c-11.6 11.9-30.6 12.2-42.5.6-12-11.7-12.2-30.8-.6-42.7m18.1-48.4l-.7 4.9-2.2-4.4m7.6.9l-3.7 3.4 1.2-4.8m5.5 4.7l-4.8 1.6 3.1-3.9' />
      </svg>
    </span>
  )
}

const ClapCount = ({ style: userStyles = {}, className }) => {
  // Get prop from MediumClapContext instead from parent MediumClap
  const { count, setRef } = useContext(MediumClapContext)
  const classNames = [styles.count, className].join(' ').trim()
  return (
    <span 
      ref={setRef} 
      data-refkey="clapCountRef" 
      className={classNames}
      style={userStyles}
    >
      + {count}
    </span>
  )
}

const ClapCountTotal = ({ style: userStyles = {}, className }) => {
  // Get prop from MediumClapContext instead from parent MediumClap
  const { countTotal, setRef } = useContext(MediumClapContext)
  const classNames = [styles.total, className].join(' ').trim()
  return (
    <span 
      ref={setRef} 
      data-refkey="clapCountTotalRef" 
      className={classNames}
      style={userStyles}
    >
      {countTotal}
    </span>
  )
}

MediumClap.Icon = ClapIcon
MediumClap.Count = ClapCount
MediumClap.Total = ClapCountTotal
// import MediumClap, { Icon, Count, Total } from 'medium-clap'

const INITIAL_STATE = {
  count: 0,
  countTotal: 2100,
  isClicked: false
}
const MAXIMUM_CLAP_VAL = 10

// MediumClap component don’t know their children ahead of time. 
// Use the special children prop to pass children elements directly into MediumClap
const Usage = () => {
  // expose count, countTotal and isClicked
  const [state, setState] = useState(INITIAL_STATE)
  const [count, setCount] = useState(0)
  const handleClap = (clapState) => {
    clapState 
    ? setCount(clapState.count) 
    : setState(({ count, countTotal }) => ({
      count:  Math.min(count + 1, MAXIMUM_CLAP_VAL),
      countTotal: count < MAXIMUM_CLAP_VAL ? countTotal + 1 : countTotal,
      isClicked: true
    }))
  }
    // count = 0
    // !count = true
    // !!count = false
  return (
    <div style={{ width: '100%' }}>
      <MediumClap 
        onClap={handleClap} 
        className={userCustomStyles.clap}
      >
        <MediumClap.Icon className={userCustomStyles.icon} />
        <MediumClap.Count className={userCustomStyles.count} />
        <MediumClap.Total className={userCustomStyles.total} />
      </MediumClap>

      <MediumClap
        values={state}
        onClap={handleClap} 
        className={userCustomStyles.clap}
      >
        <MediumClap.Icon className={userCustomStyles.icon} />
        <MediumClap.Count className={userCustomStyles.count} />
        <MediumClap.Total className={userCustomStyles.total} />
      </MediumClap>

      <MediumClap
        values={state}
        onClap={handleClap} 
        className={userCustomStyles.clap}
      >
        <MediumClap.Icon className={userCustomStyles.icon} />
        <MediumClap.Count className={userCustomStyles.count} />
        <MediumClap.Total className={userCustomStyles.total} />
      </MediumClap>
      
      {!!count && (
        <div className={styles.info}>{`You have clapped internal count ${count} times`}</div>
      )}
      {!!state.count && (
        <div className={styles.info}>{`You have clapped user count ${state.count} times`}</div>
      )}
    </div>
  )
}

export default Usage
