import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import Slide from "./Slide";
import * as THREE from "three";

const Screensaver = ({
  activeTimeout,
  interval,
  onScreensaverStart,
  onScreensaverEnd,
}) => {
  const timeElapsed = useRef(0);
  const [isScreensaverActive, setIsScreensaverActive] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(true);

  const handleWindowClick = (event) => {
    setIsTimerActive(false);
    setIsScreensaverActive(false);
  };

  const resetTimeElapsed = () => {
    timeElapsed.current = 0;
  };

  const onIntervalComplete = () => {
    console.log("interval complete");
  };

  useFrame((state, delta) => {
    // console.log("Screensaver timeElapsed: " + timeElapsed.current);
    if (isTimerActive) {
      timeElapsed.current += delta;

      if (isScreensaverActive) {
        if (timeElapsed.current >= interval) {
          onIntervalComplete();
          resetTimeElapsed();
        }
      } else {
        if (timeElapsed.current >= activeTimeout) {
          setIsScreensaverActive(true);
          onScreensaverStart();
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

      if (!isScreensaverActive) {
        setIsTimerActive(true);
      }
    }
  }, [isTimerActive]);

  useEffect(() => {
    if (!isScreensaverActive) {
      setIsTimerActive(true);
      onScreensaverEnd();
    }
  }, [isScreensaverActive]);

  return (
    <group position={new THREE.Vector3()}>
      <Slide />
    </group>
  );
};

export default Screensaver;
