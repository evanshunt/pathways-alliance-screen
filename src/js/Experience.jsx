import { useState, useRef } from "react";
import { Perf } from "r3f-perf";
import Scene from "./Scene";

const Experience = ({ debug }) => {
  const bubblesRef = useRef([]);
  const [activeItemIndex, setActiveItemIndex] = useState(-1);
  const [openItemIndex, setOpenItemIndex] = useState(-1);

  return (
    <>
      {debug && <Perf position="top-left" />}
      <Scene
        bubblesRef={bubblesRef}
        activeItemIndex={activeItemIndex}
        setActiveItemIndex={setActiveItemIndex}
        openItemIndex={openItemIndex}
        setOpenItemIndex={setOpenItemIndex}
      />
    </>
  );
};

export default Experience;
