import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useClapAnimation } from "../../hooks";

export const useClapState = (initialState = {}, values, onClap, maximumUserClap = 0, ) => {
  const [clapState, setClapState] = useState(initialState)
  const { count } = clapState
  
  const [{ clapRef, clapCountRef, clapCountTotalRef }, setRefState] = useState({});

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

  const componentJustMounted = useRef(false);

  useEffect(() => {
    if( componentJustMounted.current && !isControlled ){
      console.log('onClap is called')
      onClap && onClap(clapState)
    } else {
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
          count: Math.min(prevState.count + 1, maximumUserClap),
          countTotal: 
            count < maximumUserClap
              ? prevState.countTotal + 1 
              : prevState.countTotal,
          isClicked: true,
        }))
  }

  const getState = useCallback(
    () => isControlled ? values : clapState, 
    [isControlled, values, clapState]
  )

  const memoizedValue = useMemo(
    () => ({
      ...getState(), 
      setRef
    }), [getState, setRef]
  );

  return {
    memoizedValue,
    setRef,
    handleClapClick,
  }
}
