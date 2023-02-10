import { useRef, useLayoutEffect, cloneElement } from "react";
import gsap from "gsap";

export default ({ children, delay = 0 }) => {
  const ref = useRef();
  const timeline = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      timeline.current = gsap.timeline().from(ref.current, {
        y: 100,
        autoAlpha: 0,
        delay,
      });
    }, ref);

    return () => ctx.revert();
  }, []);
  return cloneElement(children, { ref });
};
