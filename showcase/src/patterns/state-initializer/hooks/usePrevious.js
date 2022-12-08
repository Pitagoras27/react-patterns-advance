import { useEffect, useRef } from "react"

// * get prev state value
// TODO is complex to undestand. Change this
export const usePrevious = value => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value // 2. then run use effect 
  }, [value])
  return ref.current  // 1. return 1st
}
