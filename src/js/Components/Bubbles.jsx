import { useRef, useContext, useLayoutEffect } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import { GlobalContext } from "../Context/GlobalContext";
import Bubble from "./Bubble.jsx";

const Bubbles = ({
  distance,
  setSceneLength,
  maxSceneLength,
  setMaxSceneLength,
  activeItemIndex,
  setActiveItemIndex,
  openItemIndex,
  setOpenItemIndex,
  moveToIndex,
  setMoveToIndex,
}) => {
  const GLOBAL = useContext(GlobalContext);
  const bubblesRef = useRef([]);
  const textures = useTexture({
    capture: "/images/bubbles/capture.png",
    dollars: "/images/bubbles/dollars.png",
    industry: "/images/bubbles/industry.png",
    innovation: "/images/bubbles/innovation.png",
    network: "/images/bubbles/network.png",
    storage: "/images/bubbles/storage.png",
  });

  const bubbles = [
    "industry",
    "dollars",
    "capture",
    "network",
    "storage",
    "innovation",
  ];

  useLayoutEffect(() => {
    if (GLOBAL.mode === GLOBAL.MODE.Pathway) {
      setSceneLength(bubbles.length * distance + 40);
      const calculatedMaxSceneLength = bubbles.length * distance + 40;
      if (calculatedMaxSceneLength > maxSceneLength) {
        setMaxSceneLength(calculatedMaxSceneLength);
      }
    }
  }, [GLOBAL.mode]);

  useLayoutEffect(() => {
    // If a bubble has been activated, move the camera to it
    if (bubblesRef.current[moveToIndex] != null) {
      GLOBAL.cameraPositionTarget.current.x =
        bubblesRef.current[moveToIndex].position.x + 3;
      setMoveToIndex(-1);
    }
  }, [moveToIndex]);

  useFrame((state, delta) => {
    // Check if camera is near a bubble and activate it if not already open
    if (GLOBAL.mode === GLOBAL.MODE.Pathway && openItemIndex == -1) {
      let closeMatch = false;
      bubblesRef.current.forEach((element, index) => {
        if (Math.abs(state.camera.position.x - (element.position.x + 3)) < 6) {
          setActiveItemIndex(index);
          closeMatch = true;
        }
      });
      // Otherwise close the bubbles
      if (!closeMatch) {
        setActiveItemIndex(-1);
      }
    }
  });

  return (
    <>
      {bubbles.map((view, i) => {
        return (
          <Bubble
            key={`circle=${i}`}
            index={i}
            view={view}
            texture={textures[view]}
            position={[i * distance + 10, i % 2 === 0 ? -1.8 : 1.5, 0]}
            ref={(el) => {
              bubblesRef.current[i] = el;
            }}
            active={activeItemIndex == i && true}
            onActive={() => GLOBAL.setMode(GLOBAL.MODE.Detail)}
            setActiveItemIndex={setActiveItemIndex}
            open={openItemIndex == i && true}
            setOpenItemIndex={setOpenItemIndex}
            setMoveToIndex={setMoveToIndex}
          />
        );
      })}
    </>
  );
};
export default Bubbles;
