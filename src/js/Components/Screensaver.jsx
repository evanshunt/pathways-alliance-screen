import { useEffect, useState, useContext } from "react";
import { useFrame } from "@react-three/fiber";
import Slide from "./Slide";
import * as THREE from "three";
import { useControls } from "leva";

import { GlobalContext } from "../Context/GlobalContext";

const Screensaver = (props) => {
  const GLOBAL = useContext(GlobalContext);
  const {
    setSceneLength,
    maxSceneLength,
    setMaxSceneLength,
    onScreensaverStart,
    onScreensaverEnd,
  } = props;
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
    GLOBAL.cameraPositionTarget.current.x =
      GLOBAL.cameraPositionTarget.current.x + slideDistance;
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
    if (GLOBAL.mode === GLOBAL.MODE.Screensaver) {
      setSceneLength(numSlides * slideDistance);
      const calculatedMaxSceneLength = numSlides * slideDistance;
      if (calculatedMaxSceneLength > maxSceneLength) {
        setMaxSceneLength(calculatedMaxSceneLength);
      }
    }
  }, [GLOBAL.mode]);

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
};

export default Screensaver;
