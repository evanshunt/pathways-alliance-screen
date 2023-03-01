import {
  useLayoutEffect,
  useState,
  useContext,
  useRef,
  cloneElement,
} from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useControls } from "leva";
import { useTranslation } from "react-i18next";

import { GlobalContext } from "../Context/GlobalContext";

import SlideCompanies from "./Slides/SlideCompanies";
import SlideTogether from "./Slides/SlideTogether";
import SlideTransportation from "./Slides/SlideTransportation";
import SlideNetZero from "./Slides/SlideNetZero";

import TapControl from "../Controls/TapControl";

const Screensaver = (props) => {
  const {
    setSceneLength,
    maxSceneLength,
    setMaxSceneLength,
    onScreensaverStart,
    onScreensaverEnd,
  } = props;
  const GLOBAL = useContext(GlobalContext);
  const [isActiveTimeoutComplete, setIsActiveTimeoutComplete] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [activeSlide, setActiveSlide] = useState(-1);
  const timeElapsed = useRef(0);
  const { t } = useTranslation("common");
  const slides = [
    <SlideCompanies />,
    <SlideTogether />,
    <SlideTransportation />,
    <SlideNetZero />,
  ];
  const [{ isPaused, activeTimeout, intervalTimeout, slideDistance }, set] =
    useControls(
      "Screensaver",
      () => ({
        isPaused: false,
        time: timeElapsed.current, // Only used to display time elapsed in leva
        activeTimeout: props.activeTimeout,
        intervalTimeout: props.intervalTimeout,
        slideDistance: 35,
      }),
      { collapsed: true }
    );

  const onCanvasClick = (event) => {
    setIsTimerActive(false);
    setIsActiveTimeoutComplete(false);
    setActiveSlide(-1);
  };

  const onIntervalTimeoutComplete = () => {
    setActiveSlide(activeSlide + 1);
  };

  const resetTimeElapsed = () => {
    timeElapsed.current = 0;
  };

  useFrame((state, delta) => {
    if (isTimerActive && !isPaused) {
      timeElapsed.current = timeElapsed.current + delta;
      set({ time: timeElapsed.current }); // Only used to display time elapsed in leva

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

  useLayoutEffect(() => {
    document
      .getElementById("canvas")
      .addEventListener("pointerdown", onCanvasClick);

    const calculatedMaxSceneLength = slides * slideDistance;
    if (calculatedMaxSceneLength > maxSceneLength) {
      setMaxSceneLength(calculatedMaxSceneLength);
    }

    return () => {
      document
        .getElementById("canvas")
        .removeEventListener("pointerdown", onCanvasClick);
    };
  }, []);

  useLayoutEffect(() => {
    if (GLOBAL.mode === GLOBAL.MODE.Screensaver) {
      setSceneLength(slides.length * slideDistance);
    }
  }, [GLOBAL.mode]);

  useLayoutEffect(() => {
    if (props.activeTimeout) {
      set({ activeTimeout: props.activeTimeout });
    }
  }, [props.activeTimeout]);

  useLayoutEffect(() => {
    if (!isTimerActive) {
      resetTimeElapsed();

      if (!isActiveTimeoutComplete) {
        setIsTimerActive(true);
      }
    }
  }, [isTimerActive]);

  useLayoutEffect(() => {
    if (!isActiveTimeoutComplete) {
      setIsTimerActive(true);
      onScreensaverEnd();
    } else {
      onScreensaverStart();
    }
  }, [isActiveTimeoutComplete]);

  useLayoutEffect(() => {
    if (GLOBAL.mode === GLOBAL.MODE.Screensaver) {
      if (activeSlide >= 0 && activeSlide <= slides.length - 1) {
        // Play through slides
        GLOBAL.cameraPositionTarget.current.x = 0 + slideDistance * activeSlide;
      } else if (activeSlide === slides.length) {
        // Tease the Pathway mode
        GLOBAL.cameraPositionTarget.current.x = 0;
        GLOBAL.cameraPositionTarget.current.y = 0;
      } else {
        // Reset to beginning slide
        setActiveSlide(0);
        GLOBAL.cameraPositionTarget.current.y = 16;
      }
    }
  }, [activeSlide]);

  return (
    <>
      <TapControl />
      {GLOBAL.mode === GLOBAL.MODE.Screensaver && (
        <group position={new THREE.Vector3()}>
          {slides.map((slide, i) => {
            return (
              <Html
                fullscreen
                zIndexRange={[100, 0]}
                position={[0 + slideDistance * i, 16, 0]}
                key={`slide-${i}`}
              >
                <section className={"slide"}>
                  {cloneElement(slide, {
                    t,
                    isActive: activeSlide === i,
                  })}
                </section>
              </Html>
            );
          })}
        </group>
      )}
    </>
  );
};

export default Screensaver;
