import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP);

// Runs `setup(root)` inside a gsap context scoped to the returned ref, using
// the official React integration so tweens/ScrollTriggers survive React 19
// StrictMode's mount→unmount→mount cycle instead of landing in a half
// reverted state.
export function useGSAPContext(setup, deps = []) {
  const scope = useRef(null);

  useGSAP(
    () => {
      if (!scope.current) return;
      setup(scope.current);
    },
    { scope, dependencies: deps }
  );

  return scope;
}
