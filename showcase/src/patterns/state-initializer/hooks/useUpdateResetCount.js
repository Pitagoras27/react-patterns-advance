import { useRef } from "react"
import { MAXIMUM_USER_CLAP } from "../config"
import { usePrevious } from "./usePrevious"

export const useUpdateResetCount = ({ count, setClapState, USER_INITIAL_STATE}) => {

  const resetRef = useRef(0) // 0, 1, 2, 3, ...
  const prevCount = usePrevious(count)
  const userInitialState = useRef(USER_INITIAL_STATE)

  const reset = () => {
    if(prevCount < count || prevCount === MAXIMUM_USER_CLAP) {
      setClapState(userInitialState.current)
      resetRef.current++
    }
  }

  return {
    reset, 
    resetDep: resetRef.current
  }
}