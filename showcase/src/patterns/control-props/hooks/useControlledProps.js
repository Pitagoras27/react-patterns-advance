import { useState } from "react"
import { MAXIMUM_CLAP_CONTROLLED, STATE_CONTROLLED } from "../config"

export const useControlledProps = () => {
  const [state, setState] = useState(STATE_CONTROLLED)
  const [count, setCount] = useState(0)

  const handleClap = (clapState) => {
    clapState 
    ? setCount(clapState.count) 
    : setState(({ count, countTotal }) => ({
      count:  Math.min(count + 1, MAXIMUM_CLAP_CONTROLLED),
      countTotal: count < MAXIMUM_CLAP_CONTROLLED ? countTotal + 1 : countTotal,
      isClicked: true
    }))
  }

  return {
    state,
    count,
    handleClap,
  }
}