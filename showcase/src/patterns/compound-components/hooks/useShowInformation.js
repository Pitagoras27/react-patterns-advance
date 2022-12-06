import { useState } from "react";

export const useShowInformation = () => {
  const [count, setCount] = useState(0);

  const handleClap = (clapState) => setCount(clapState.count)

  return {
    count,
    handleClap,
  }
}