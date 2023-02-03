import { useState, useLayoutEffect, useRef } from "react";
import { Perf } from "r3f-perf";

import * as THREE from "three";

import { GlobalContext } from "./Context/GlobalContext.jsx";
import DragControl from "./Controls/DragControl.jsx";
import HomeControl from "./Controls/HomeControl.jsx";
import Camera from "./Components/Camera.jsx";
import Background from "./Components/Background.jsx";
import Waves from "./Components/Waves.jsx";
import Screensaver from "./Components/Screensaver";
import Bubbles from "./Components/Bubbles.jsx";
import Headline from "./Components/Headline.jsx";
import Payoff from "./Components/Payoff.jsx";
import DetailView from "./Components/DetailView.jsx";

export default ({ debug }) => {
  const MODE = Object.freeze({
    Screensaver: "Screensaver",
    Pathway: "Pathway",
    Detail: "Detail",
  });
  const [mode, setMode] = useState(MODE.Pathway);

  const cameraPositionTarget = useRef(new THREE.Vector3(0, 0, 10));
  const cameraPositionLerped = useRef(new THREE.Vector3());
  const [activeItemIndex, setActiveItemIndex] = useState(-1);
  const [openItemIndex, setOpenItemIndex] = useState(-1);
  const [moveToIndex, setMoveToIndex] = useState(-1);
  const [maxSceneLength, setMaxSceneLength] = useState(0);
  const [sceneLength, setSceneLength] = useState(0);

  useLayoutEffect(() => {
    // If a bubble has been opened, move the camera to the center of it
    // And maybe do more stuff, TBD!
    setActiveItemIndex(-1);
  }, [openItemIndex, mode]);

  const globalContextValue = {
    MODE,
    mode,
    setMode,
    cameraPositionTarget,
    cameraPositionLerped,
  };

  return (
    <GlobalContext.Provider value={globalContextValue}>
      {debug && <Perf position="top-left" />}

      <Camera sceneLength={sceneLength} />
      <DragControl
        sceneLength={sceneLength}
        isDragDisabled={mode !== MODE.Pathway}
      />
      <HomeControl
        openItemIndex={openItemIndex}
        onPointerDown={() => {
          setMode(MODE.Pathway);
          setOpenItemIndex(-1);
          setActiveItemIndex(-1);
        }}
      />

      <Background sceneLength={sceneLength} />
      <Waves maxSceneLength={maxSceneLength} />

      <Screensaver
        setSceneLength={setSceneLength}
        maxSceneLength={maxSceneLength}
        setMaxSceneLength={setMaxSceneLength}
        activeTimeout={30} // How long before Screensaver starts
        intervalTimeout={5} // How long between slides
        onScreensaverStart={() => {
          setMode(MODE.Screensaver);
          setOpenItemIndex(-1);
          setActiveItemIndex(-1);
        }}
        onScreensaverEnd={() => setMode(MODE.Pathway)}
      />
      <Headline position={[-1, 2, 3]} />
      <Payoff position={[sceneLength - 23, 0, -2]} />
      <Bubbles
        distance={15}
        setSceneLength={setSceneLength}
        maxSceneLength={maxSceneLength}
        setMaxSceneLength={setMaxSceneLength}
        activeItemIndex={activeItemIndex}
        setActiveItemIndex={setActiveItemIndex}
        openItemIndex={openItemIndex}
        setOpenItemIndex={setOpenItemIndex}
        moveToIndex={moveToIndex}
        setMoveToIndex={setMoveToIndex}
      />
      <DetailView active={mode === MODE.Detail ? true : false} />
    </GlobalContext.Provider>
  );
};
