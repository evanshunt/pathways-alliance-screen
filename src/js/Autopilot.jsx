import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";

const Autopilot = ({ interval }) => {
  const timeElapsed = useRef(0);
  const [isAutopilotActive, setIsAutoPilotActive] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(true);

  const handleWindowClick = (event) => {
    setIsTimerActive(false);
    setIsAutoPilotActive(false);
  };

  useFrame((state, delta) => {
    console.log(timeElapsed.current);
    if (isTimerActive) {
      timeElapsed.current += delta;

      if (timeElapsed.current >= interval) {
        setIsAutoPilotActive(true);
        setIsTimerActive(false);
      }
    }
  });

  useEffect(() => {
    window.addEventListener("click", handleWindowClick);
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  useEffect(() => {
    if (!isTimerActive) {
      timeElapsed.current = 0;

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
        position={[-0.75, 0.75, 0]}
        textAlign="center"
        maxWidth={10}
        letterSpacing={-0.08}
        lineHeight={0.8}
      >
        Autopilot active
        <meshStandardMaterial />
      </Text>
    )
  );
};

export default Autopilot;
