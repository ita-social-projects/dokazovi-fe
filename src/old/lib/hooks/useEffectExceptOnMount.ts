import React, { useEffect, useRef } from 'react';

export const useEffectExceptOnMount = (
  func: (() => void) | (() => () => void),
  deps: React.DependencyList | undefined,
): void => {
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};
