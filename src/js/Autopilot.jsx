import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";

const Autopilot = ({ activeTimeout, interval, onIntervalComplete }) => {
  const timeElapsed = useRef(0);
  const [isAutopilotActive, setIsAutoPilotActive] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(true);

  const handleWindowClick = (event) => {
    setIsTimerActive(false);
    setIsAutoPilotActive(false);
  };

  const resetTimeElapsed = () => {
    timeElapsed.current = 0;
  };

  useFrame((state, delta) => {
    // console.log("Autopilot timeElapsed: " + timeElapsed.current);
    if (isTimerActive) {
      timeElapsed.current += delta;

      if (isAutopilotActive) {
        if (timeElapsed.current >= interval) {
          onIntervalComplete();
          resetTimeElapsed();
        }
      } else {
        if (timeElapsed.current >= activeTimeout) {
          setIsAutoPilotActive(true);
          onIntervalComplete();
          resetTimeElapsed();
        }
      }
    }
  });

  useEffect(() => {
    window.addEventListener("pointerdown", handleWindowClick);
    return () => {
      window.removeEventListener("pointerdown", handleWindowClick);
    };
  }, []);

  useEffect(() => {
    if (!isTimerActive) {
      resetTimeElapsed();

      if (!isAutopilotActive) {
        setIsTimerActive(true);
      }
    }
  }, [isTimerActive]);

  useEffect(() => {
    if (!isAutopilotActive) {
      setIsTimerActive(true);
    }
  }, [isAutopilotActive]);

  return (
    isAutopilotActive && (
      <Text
        position={[0, -2, 0]}
        textAlign="center"
        maxWidth={10}
        letterSpacing={-0.08}
        lineHeight={0.8}
      >
        Autopilot active
      </Text>
    )
  );
};

export default Autopilot;
