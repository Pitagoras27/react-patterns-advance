import { useCallback, useState } from "react"

const MAXIMUM_USER_CLAP = 50

export const useClapState = (initialState = {}) => {
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

  const togglerProps = {
    onClick: updateClapState,
    'aria-pressed': clapState.isClicked
  }

  const counterProps = ({ ...otherProps }) => ({
    count,
    'aria-valuemax': MAXIMUM_USER_CLAP,
    'aria-valuemin': 0,
    'aria-valuenow': count,
    ...otherProps
  })

  return { clapState, updateClapState, togglerProps, counterProps }
}