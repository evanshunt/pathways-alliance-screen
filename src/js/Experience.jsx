import { useState, useRef } from "react";
import { Perf } from 'r3f-perf'
import Autopilot from "./Controls/Autopilot";
import Scene from "./Scene";

const Experience = ({debug}) => {
  const bubblesRef = useRef([]);
  const [activeItemIndex, setActiveItemIndex] = useState(-1);
  const [openItemIndex, setOpenItemIndex] = useState(-1);

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

      {/* <Autopilot
        activeTimeout={60} // How long before autopilot starts
        interval={10} // How long between onIntervalComplete callbacks
        onIntervalComplete={handleAutopilotIntervalComplete}
      /> */}
    </>
  );
};

export default Experience;
