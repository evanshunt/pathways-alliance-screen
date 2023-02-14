import { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";

export default ({ number, delay = 0, duration = 1, isActive, toFixed = 0 }) => {
  const tweenObj = { count: 0 };
  const timeline = useRef();
  const [countedNumber, setCountedNumber] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      timeline.current = gsap.timeline().to(tweenObj, {
        count: number,
        delay: 0.8 + delay, // TODO: Adding a bit of delay to account for camera tweening to complete, make this dynamic?
        duration: duration,
        onUpdate: function () {
          setCountedNumber(
            Number(tweenObj.count.toFixed(toFixed)).toLocaleString("en-US")
          );
        },
      });
    });

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (isActive) {
      setCountedNumber(0);
      timeline.current.play(0);
    }
  }, [isActive]);

  return <>{countedNumber}</>;
};
