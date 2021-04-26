import React, { useEffect, useState } from 'react';

const useEffectFirstChange = (
  func: (() => void) | (() => () => void),
  deps: React.DependencyList | undefined,
): void => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (count === 0) {
      func();
      setCount(1);
    }
  }, deps);
};

export default useEffectFirstChange;
