import { useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import Slide from "./Slide";
import * as THREE from "three";
import { useControls } from "leva";

const Screensaver = (props) => {
  const { onScreensaverStart, onScreensaverEnd } = props;
  const [isActiveTimeoutComplete, setIsActiveTimeoutComplete] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [{ timeElapsed, activeTimeout, intervalTimeout }, setLeva] =
    useControls("Screensaver", () => ({
      activeTimeout: props.activeTimeout,
      intervalTimeout: props.intervalTimeout,
      timeElapsed: 0,
    }));

  const handleWindowClick = (event) => {
    setIsTimerActive(false);
    setIsActiveTimeoutComplete(false);
  };

  const resetTimeElapsed = () => {
    setLeva({ timeElapsed: 0 });
  };

  const onIntervalTimeoutComplete = () => {
    console.log("interval complete");
  };

  useFrame((state, delta) => {
    if (isTimerActive) {
      setLeva({ timeElapsed: timeElapsed + delta });

      if (isActiveTimeoutComplete) {
        if (timeElapsed >= intervalTimeout) {
          onIntervalTimeoutComplete();
          resetTimeElapsed();
        }
      } else {
        if (timeElapsed >= activeTimeout) {
          setIsActiveTimeoutComplete(true);
          onIntervalTimeoutComplete();
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

      if (!isActiveTimeoutComplete) {
        setIsTimerActive(true);
      }
    }
  }, [isTimerActive]);

  useEffect(() => {
    if (!isActiveTimeoutComplete) {
      setIsTimerActive(true);
      onScreensaverEnd();
    } else {
      onScreensaverStart();
    }
  }, [isActiveTimeoutComplete]);

  return (
    <group position={new THREE.Vector3()}>
      {[...Array(4)].map((el, i) => {
        return <Slide position={[0 + 35 * i, 15, 0]} key={`slide-${i}`} />;
      })}
    </group>
  );
};

export default Screensaver;
