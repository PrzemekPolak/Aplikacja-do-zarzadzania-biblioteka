import { useEffect, useRef } from "react";

const useEffectNoInitial = (
  func: React.EffectCallback,
  deps: React.DependencyList
) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) return func();
    else didMount.current = true;
  }, deps);
};

export { useEffectNoInitial };
