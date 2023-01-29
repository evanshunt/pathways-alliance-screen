import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Perf } from 'r3f-perf'
import Autopilot from "./Controls/Autopilot";
import Scene from "./Scene";
import HomeControl from "./Controls/HomeControl";

const Experience = ({debug}) => {
  const bubblesRef = useRef([]);
  const [activeItemIndex, setActiveItemIndex] = useState(-1);
  const [openItemIndex, setOpenItemIndex] = useState(-1);

  useFrame((state) => {
    // Lock camera to x-axis while panning
    const lastBubblePositionX =
      bubblesRef.current[bubblesRef.current.length - 1].position.x;
    if (state.camera.position.x < 0) {
      state.camera.position.x = 0;
    } else if (state.camera.position.x > lastBubblePositionX) {
      state.camera.position.x = lastBubblePositionX;
    }

    state.camera.position.y = 0;
    state.camera.position.z = 10;
    state.camera.rotation.x = 0;
    state.camera.rotation.y = 0;
    state.camera.rotation.z = 0;
  });

  const handleAutopilotIntervalComplete = () => {
    if (
      activeItemIndex === null ||
      activeItemIndex === bubblesRef.current.length - 1
    ) {
      setActiveItemIndex(0);
    } else if (activeItemIndex === -1) {
      setActiveItemIndex(bubblesRef.current.length - 1);
    } else {
      setActiveItemIndex(activeItemIndex + 1);
    }
  };

  return (
    <>
      { debug && <Perf position="top-left" /> }
      <Scene
        bubblesRef={bubblesRef}
        activeItemIndex={activeItemIndex}
        setActiveItemIndex={setActiveItemIndex}
        openItemIndex={openItemIndex}
        setOpenItemIndex={setOpenItemIndex}
      />

      <Autopilot
        activeTimeout={60} // How long before autopilot starts
        interval={10} // How long between onIntervalComplete callbacks
        onIntervalComplete={handleAutopilotIntervalComplete}
      />

      <HomeControl
        openItemIndex={openItemIndex}
        setOpenItemIndex={setOpenItemIndex}
        setActiveItemIndex={setActiveItemIndex}
      />
    </>
  );
};

export default Experience;
