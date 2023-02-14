import { useRef, useLayoutEffect, cloneElement } from "react";
import gsap from "gsap";

export default ({ children, delay = 0, isActive }) => {
  const ref = useRef();
  const timelineRef = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      timelineRef.current = gsap.timeline().from(ref.current, {
        y: 100,
        autoAlpha: 0,
        delay: 0.8 + delay, // TODO: Adding a bit of delay to account for camera tweening to complete, make this dynamic?
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (isActive) {
      timelineRef.current.play(0);
    }
  }, [isActive]);

  return cloneElement(children, { ref });
};
