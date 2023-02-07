import { useEffect, useState, useContext, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useControls } from "leva";

import { GlobalContext } from "../Context/GlobalContext";

import Slide from "./Slide";
import SlideCompanies from "./Slides/SlideCompanies";
import SlideTogether from "./Slides/SlideTogether";

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
  const timeElapsed = useRef(0);
  const slides = [<SlideCompanies />, <SlideTogether />];
  const [{ isTimerPaused, activeTimeout, intervalTimeout, slideDistance }] =
    useControls("Screensaver", () => ({
      isTimerPaused: false,
      activeTimeout: props.activeTimeout,
      intervalTimeout: props.intervalTimeout,
      slideDistance: 35,
    }));

  const handleCanvasClick = (event) => {
    setIsTimerActive(false);
    setIsActiveTimeoutComplete(false);
  };

  const resetTimeElapsed = () => {
    timeElapsed.current = 0;
  };

  const onIntervalTimeoutComplete = () => {
    GLOBAL.cameraPositionTarget.current.x =
      GLOBAL.cameraPositionTarget.current.x + slideDistance;
  };

  useFrame((state, delta) => {
    if (isTimerActive && !isTimerPaused) {
      timeElapsed.current = timeElapsed.current + delta;

      if (isActiveTimeoutComplete) {
        if (timeElapsed.current >= intervalTimeout) {
          onIntervalTimeoutComplete();
          resetTimeElapsed();
        }
      } else {
        if (timeElapsed.current >= activeTimeout) {
          setIsActiveTimeoutComplete(true);
          onIntervalTimeoutComplete();
          resetTimeElapsed();
        }
      }
    }
  });

  useEffect(() => {
    document
      .getElementById("canvas")
      .addEventListener("pointerdown", handleCanvasClick);

    const calculatedMaxSceneLength = slides * slideDistance;
    if (calculatedMaxSceneLength > maxSceneLength) {
      setMaxSceneLength(calculatedMaxSceneLength);
    }

    return () => {
      document
        .getElementById("canvas")
        .removeEventListener("pointerdown", handleCanvasClick);
    };
  }, []);

  useEffect(() => {
    if (GLOBAL.mode === GLOBAL.MODE.Screensaver) {
      setSceneLength(slides.length * slideDistance);
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
      {slides.map((slide, i) => {
        return (
          <Slide position={[0 + slideDistance * i, 15, 0]} key={`slide-${i}`}>
            {slide}
          </Slide>
        );
      })}
    </group>
  );
};

export default Screensaver;
