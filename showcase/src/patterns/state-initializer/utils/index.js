export const callFnsInSquence = (...fns) => (...args) => {
  fns.forEach(fn => fn && fn(...args))
}

export const getTogglerProps = ({ onClick, updateClapState, clapState, ...otherProps }) => ({
  onClick: callFnsInSquence(updateClapState, onClick),
  'aria-pressed': clapState.isClicked,
  ...otherProps
});