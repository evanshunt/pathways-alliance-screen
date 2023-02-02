import { useEffect, useState, useContext, forwardRef } from "react";
import { useFrame } from "@react-three/fiber";
import Slide from "./Slide";
import * as THREE from "three";
import { useControls } from "leva";

import { GlobalContext } from "../Context/GlobalContext";

const Screensaver = forwardRef((props, ref) => {
  const GLOBAL = useContext(GlobalContext);
  const { sceneLength, setSceneLength, onScreensaverStart, onScreensaverEnd } =
    props;
  const [isActiveTimeoutComplete, setIsActiveTimeoutComplete] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const numSlides = 8;
  const [
    { timeElapsed, activeTimeout, intervalTimeout, slideDistance },
    setLeva,
  ] = useControls("Screensaver", () => ({
    timeElapsed: 0,
    activeTimeout: props.activeTimeout,
    intervalTimeout: props.intervalTimeout,
    slideDistance: 35,
  }));

  const handleWindowClick = (event) => {
    setIsTimerActive(false);
    setIsActiveTimeoutComplete(false);
  };

  const resetTimeElapsed = () => {
    setLeva({ timeElapsed: 0 });
  };

  const onIntervalTimeoutComplete = () => {
    GLOBAL.cameraPositionTarget.x =
      GLOBAL.cameraPositionTarget.x + slideDistance;
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
    const calculatedSceneLength = numSlides * slideDistance + 40;
    if (calculatedSceneLength > sceneLength) {
      setSceneLength(numSlides * slideDistance + 40);
    }

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
      {[...Array(numSlides)].map((el, i) => {
        return (
          <Slide position={[0 + slideDistance * i, 15, 0]} key={`slide-${i}`} />
        );
      })}
    </group>
  );
});

export default Screensaver;
