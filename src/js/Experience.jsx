import { useEffect, useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";

import Autopilot from "./Autopilot";
import Controls from "./Controls";
import Scene from "./Scene";

// TODO:
// Add wave pattern
// Create motion with camera to move from bubble to bubble
// Scale bubbles when they are active
// Add polish like slight shake to an element when it's touched
// Setup a separate camera to display UI controls (language switching and left/right arrows)
// Use context to pass global states around (autopilot active, etc)

const Experience = () => {
  const bubblesRef = useRef([]);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

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
      <Controls
        bubblesRef={bubblesRef}
        activeItemIndex={activeItemIndex}
        setActiveItemIndex={setActiveItemIndex}
      />

      <Scene
        bubblesRef={bubblesRef}
        activeItemIndex={activeItemIndex}
        setActiveItemIndex={setActiveItemIndex}
      />

      <Autopilot
        activeTimeout={20} // How long before autopilot starts
        interval={5} // How long between onIntervalComplete callbacks
        onIntervalComplete={handleAutopilotIntervalComplete}
      />
    </>
  );
};

export default Experience;
