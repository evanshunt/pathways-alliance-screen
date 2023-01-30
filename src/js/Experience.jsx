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
    state.camera.position.y = 0;
    state.camera.position.z = 10;
    state.camera.lookAt(state.camera.position.x, 0, 0);
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
      <color attach="background" args={["#163bae"]} />
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
