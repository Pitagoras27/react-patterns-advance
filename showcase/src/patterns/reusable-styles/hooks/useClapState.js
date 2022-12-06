import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useClapAnimation } from "../../hooks";

export const useClapState = (initialState = {}, onClap, maximumUserClap = 0, ) => {
  const [clapState, setClapState] = useState(initialState)
  const { count } = clapState
  
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

  const componentJustMounted = useRef(false)

  useEffect(() => {
    if( componentJustMounted.current ){
      console.log('onClap is called')
      onClap && onClap(clapState)
    } else {
      componentJustMounted.current = true
    }
  }, [count])

  const handleClapClick = () => {
    animationTimeline.replay()
    setClapState(prevState => ({
      count: Math.min(prevState.count + 1, maximumUserClap),
      countTotal: 
        count < maximumUserClap 
          ? prevState.countTotal + 1 
          : prevState.countTotal,
      isClicked: true,
    }))
  }

  const memoizedValue = useMemo(
    () => ({
      ...clapState, 
      setRef
    }), [clapState, setRef]
  )

  return {
    memoizedValue,
    setRef,
    handleClapClick,
  }
}
