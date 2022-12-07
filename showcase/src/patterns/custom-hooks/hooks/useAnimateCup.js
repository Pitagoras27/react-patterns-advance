import { useClapAnimation } from "./useClapAnimation"

export const useAnimateCup = () => {
  const animationTimeline = useClapAnimation({
    clapEl: '#coffee',  // burstEl
    clapCountEl: '#stream',  // bounceEl
    clapCountTotalEl: '#cupHandle', // fadeEl

  })

  const handleClick = () => {
    animationTimeline.replay()
  }

  return {
    handleClick
  }
}
