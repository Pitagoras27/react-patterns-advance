import mojs from 'mo-js'
import { useLayoutEffect, useState } from "react"

export const useClapAnimation = ({
  clapEl, 
  clapCountEl, 
  clapCountTotalEl
}) => {

  // Do not write useState(new mojs.Timeline())
  // if not every single time useClapAnimation is called
  // new mojs.Timeline() is involved
  const [animationTimeline, setAnimationTimeline] = useState(() => new mojs.Timeline())
  
  useLayoutEffect(() => {
    if(!clapEl || !clapCountEl || !clapCountTotalEl) return
    const tlDuration = 300
    const scaleButton = new mojs.Html({
      el: clapEl,
      duration: tlDuration,
      // scale from [t=0, 1.3] to [t=300, 1]
      scale: { 1.3 : 1 },
      easing: mojs.easing.ease.out
    })

    const countTotalAnimation = new mojs.Html({
      el: clapCountTotalEl,
      delay: (3 * tlDuration) / 2,
      duration: tlDuration,
      // opacity from [t=delay, 0] to [t=300, 1]
      opacity: { 0 : 1 },
      // move up y axis from [t=delay, y=0] to [t=300, y=-3]
      y: { 0 : -3 }
    })

    const countAnimation = new mojs.Html({
      el: clapCountEl,
      duration: tlDuration,
      opacity: { 0 : 1 },
      y: { 0 : -30 }
    }).then({
      // next animation to fade out
      delay: tlDuration / 2,
      opacity: { 1 : 0 },
      y: -80
    })

    // scale back to 1 before animation start
    // TODO is neccessary use getElementById ?
    if(typeof clapEl === 'string') {
      const clap = document.getElementById('clap')
      clap.style.transform = 'scale(1,1)'
    } else {
      clapEl.style.transform = 'scale(1,1)'
    }

    // particle effect burst
    const triangleBurst = new mojs.Burst({
      parent: clapEl,
      // radius from [t=0, 50] to [t=300, 95]
      radius: { 50 : 95 },
      count: 5,
      angle: 30,
      children: {
        // default is triangle
        shape: 'polygon',
        radius: { 6 : 0 },
        stroke: 'rgba(211,54,0,0.5)',
        strokeWidth: 2,
        // angle of each particle
        angle: 210,
        speed: 0.2,
        delay: 30,
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
        duration: tlDuration,
      }
    })

    const circleBurst = new mojs.Burst({
      parent: clapEl,
      radius: { 50: 75 },
      angle: 25,
      duration: tlDuration,
      children: {
        shape: 'circle',
        fill: 'rgba(149,165,166,0.5)',
        delay: 30,
        speed: 0.2,
        radius: { 3 : 0 },
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
      }
    })

    const newAnimationTimeline = animationTimeline.add(
      [
        scaleButton, 
        countTotalAnimation,
        countAnimation,
        triangleBurst,
        circleBurst
      ]
    )

    setAnimationTimeline(newAnimationTimeline)
    
  }, [clapEl, clapCountEl, clapCountTotalEl])

  return animationTimeline;
}