import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

const Timer = ({ onTimerFinished, isTimerActive, timerTimeLimit }) => {
  const [isActive, setIsActive] = useState(isTimerActive);
  const timeElapsed = useRef(0);

  useFrame((state, delta) => {
    if (isActive) {
      timeElapsed.current += delta;

      if (timeElapsed.current >= timerTimeLimit) {
        onTimerFinished();
        setIsActive(false);
      }
    }
  });

  useEffect(() => {
    if (isActive) {
      timeElapsed.current = 0;
    }
  }, [isActive]);
};

export default Timer;
