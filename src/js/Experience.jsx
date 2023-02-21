import { useState, useLayoutEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import * as THREE from "three";

import { GlobalContext } from "./Context/GlobalContext";
import DragControl from "./Controls/DragControl";
import BackControl from "./Controls/BackControl";
import SwipeControl from "./Controls/SwipeControl";
import Camera from "./Components/Camera";
import Logo from "./Components/Logo";
import Background from "./Components/Background";
import Waves from "./Components/Waves";
import Screensaver from "./Components/Screensaver";
import Bubbles from "./Components/Bubbles";
import Headline from "./Components/Headline";
import WireDrawing from "./Components/WireDrawing";
import Payoff from "./Components/Payoff";
import Details from "./Components/Details";

export default ({ debug }) => {
  const MODE = Object.freeze({
    Screensaver: "Screensaver",
    Pathway: "Pathway",
    Detail: "Detail",
  });
  const { camera } = useThree();
  const cameraPositionTarget = useRef(new THREE.Vector3(0, 0, 10));
  const cameraPositionLerped = useRef(new THREE.Vector3());
  const [mode, setMode] = useState(MODE.Pathway);
  const [lastPathwayPosition, setLastPathwayPosition] = useState(0);
  const [activeItemIndex, setActiveItemIndex] = useState(-1);
  const [openItemIndex, setOpenItemIndex] = useState(-1);
  const [moveToIndex, setMoveToIndex] = useState(-1);
  const [maxSceneLength, setMaxSceneLength] = useState(0);
  const [sceneLength, setSceneLength] = useState(0);

  const globalContextValue = {
    MODE,
    mode,
    setMode,
    cameraPositionTarget,
    cameraPositionLerped,
    lastPathwayPosition,
  };

  useLayoutEffect(() => {
    if (mode !== MODE.Pathway) {
      setActiveItemIndex(-1);
    }

    if (mode === MODE.Detail) {
      setLastPathwayPosition(camera.position.x);
    } else {
      setLastPathwayPosition(0);
      setOpenItemIndex(-1);
    }
  }, [mode]);

  return (
    <GlobalContext.Provider value={globalContextValue}>
      {debug && <Perf position="top-left" />}

      <Camera sceneLength={sceneLength} />
      <DragControl
        sceneLength={sceneLength}
        isDragDisabled={mode !== MODE.Pathway}
      />
      <BackControl
        openItemIndex={openItemIndex}
        onPointerDown={() => {
          setMode(MODE.Pathway);
        }}
      />
      <SwipeControl />
      <Logo />
      <Background sceneLength={sceneLength} />
      <Waves maxSceneLength={maxSceneLength} />

      <Screensaver
        setSceneLength={setSceneLength}
        maxSceneLength={maxSceneLength}
        setMaxSceneLength={setMaxSceneLength}
        activeTimeout={30} // How long before Screensaver starts
        intervalTimeout={10} // How long between slides
        onScreensaverStart={() => {
          setMode(MODE.Screensaver);
        }}
        onScreensaverEnd={() => setMode(MODE.Pathway)}
      />
      <Headline position={[0, 0, -2]} />
      {mode === MODE.Pathway && (
        <Payoff position={new THREE.Vector3(sceneLength - 20, 0, -2)} />
      )}
      <WireDrawing
        position={new THREE.Vector3(38, 0, -3.5)}
        wireType="capture"
      />
      <WireDrawing
        position={new THREE.Vector3(79, 0, -3.5)}
        wireType="storage"
      />
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
      <Details openItemIndex={openItemIndex} />
    </GlobalContext.Provider>
  );
};
