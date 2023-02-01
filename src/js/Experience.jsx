import { useRef, useState, useLayoutEffect } from "react";
import { Perf } from "r3f-perf";
import { useFrame } from "@react-three/fiber";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import DragControl from "./Controls/DragControl.jsx";
import HomeControl from "./Controls/HomeControl.jsx";
import Screensaver from "./Components/Screensaver";
import Bubble from "./Components/Bubble.jsx";
import Headline from "./Components/Headline.jsx";
import Payoff from "./Components/Payoff.jsx";
import Waves from "./Components/Waves.jsx";
import DetailView from "./Components/DetailView.jsx";

export default ({debug}) => {
  const Mode = Object.freeze({
    Screensaver: "Screensaver",
    Pathway: "Pathway",
    Detail: "Detail",
  });
  const bubblesRef = useRef([]);
  const backgroundRef = useRef();
  const dragControlRef = useRef();
  const homeControlRef = useRef();
  const detailViewRef = useRef([]);
  const textures = useTexture({
    capture: "/images/capture.png",
    dollars: "/images/dollars.png",
    industry: "/images/industry.png",
    innovation: "/images/innovation.png",
    network: "/images/network.png",
    storage: "/images/storage.png",
  });
  const [smoothedCameraPosition] = useState(() => new THREE.Vector3());
  const [modifiedCameraPosition] = useState(() => new THREE.Vector3(0, 0, 10));
  const [activeItemIndex, setActiveItemIndex] = useState(-1);
  const [openItemIndex, setOpenItemIndex] = useState(-1);
  const [moveToIndex, setMoveToIndex] = useState(-1);
  const [mode, setMode] = useState(Mode.Pathway);
  const bubbleDistance = 15;
  const bubbles = [
    "industry",
    "dollars",
    "capture",
    "network",
    "storage",
    "innovation",
  ];
  const sceneLength = bubbles.length * bubbleDistance + 40;
  const backgroundStartColour = new THREE.Color(0x252154);
  const backgroundEarlyMidColour = new THREE.Color(0x163bae);
  const backgroundLateMidColour = new THREE.Color(0x0c4eea);
  const backgroundEndColour = new THREE.Color(0x00eefa);

  useLayoutEffect(() => {
    // If a bubble has been opened, move the camera to the center of it
    // And maybe do more stuff, TBD!
    setActiveItemIndex(-1);
  }, [openItemIndex, mode]);

  useLayoutEffect(() => {
    if (mode === Mode.Screensaver) {
      modifiedCameraPosition.y = 15;
    } else if (mode === Mode.Pathway) {
      modifiedCameraPosition.y = 0;
    } else if (mode === Mode.Detail) {
      modifiedCameraPosition.y = -20;
    }
  }, [activeItemIndex, mode]);

  useLayoutEffect(() => {
    // If a bubble has been activated, move the camera to it
    if (bubblesRef.current[moveToIndex] != null) {
      modifiedCameraPosition.x = bubblesRef.current[moveToIndex].position.x + 3;
      setMoveToIndex(-1);
    }
  }, [moveToIndex]);

  useFrame((state, delta) => {
    // Pull the camera towards the new position, smoothly
    smoothedCameraPosition.lerp(modifiedCameraPosition, 4 * delta);
    state.camera.position.copy(smoothedCameraPosition);

    // Keep the controls and different views pinned
    dragControlRef.current.position.x = smoothedCameraPosition.x;
    dragControlRef.current.position.y = smoothedCameraPosition.y;
    homeControlRef.current.position.x = smoothedCameraPosition.x;
    homeControlRef.current.position.y = smoothedCameraPosition.y;
    detailViewRef.current.position.x = smoothedCameraPosition.x;

    // Check if camera is near a bubble and activate it if not already open
    if (openItemIndex == -1) {
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

    // Set background colour based on position
    let backgroundColour = new THREE.Color();
    const sceneTravelled = state.camera.position.x / sceneLength;
    if (sceneTravelled <= -0.5) backgroundColour.copy(backgroundEndColour);
    else if (sceneTravelled < 0)
      backgroundColour.lerpColors(
        backgroundEndColour,
        backgroundStartColour,
        (0.5 + sceneTravelled) / 0.5
      );
    else if (sceneTravelled <= 0.2)
      backgroundColour.lerpColors(
        backgroundStartColour,
        backgroundEarlyMidColour,
        (sceneTravelled - 0) / 0.2
      );
    else if (sceneTravelled <= 0.7)
      backgroundColour.lerpColors(
        backgroundEarlyMidColour,
        backgroundLateMidColour,
        (sceneTravelled - 0.2) / 0.5
      );
    else if (sceneTravelled <= 1)
      backgroundColour.lerpColors(
        backgroundLateMidColour,
        backgroundEndColour,
        (sceneTravelled - 0.7) / 0.3
      );
    else backgroundColour.copy(backgroundEndColour);

    backgroundRef.current.r = backgroundColour.r;
    backgroundRef.current.g = backgroundColour.g;
    backgroundRef.current.b = backgroundColour.b;

    // Check if we've gone to the bounds and flip back
    if (sceneTravelled > 0.99) {
      modifiedCameraPosition.x = 0;
      smoothedCameraPosition.x = -0.5 * sceneLength;
      state.camera.position.x = -0.5 * sceneLength;
    }
  });

  return (
    <>
      {debug && <Perf position="top-left" />}
      <EffectComposer>
        <Vignette eskil={true} offset={0.5} darkness={0.5} />
      </EffectComposer>
      <ambientLight intensity={1} />
      <color ref={backgroundRef} attach="background" />
      <Waves sceneLength={sceneLength} />
      <DragControl
        ref={dragControlRef}
        sceneLength={sceneLength}
        dragDisabled={openItemIndex == -1 && moveToIndex == -1 && true}
        modifiedCameraPosition={modifiedCameraPosition}
      />
      <HomeControl
        ref={homeControlRef}
        openItemIndex={openItemIndex}
        onPointerDown={() => {
          setMode(Mode.Pathway);
          setOpenItemIndex(-1);
          setActiveItemIndex(-1);
        }}
      />

      <Screensaver
        activeTimeout={10} // How long before Screensaver starts
        interval={5} // How long between slides
        onScreensaverStart={() => {
          setMode(Mode.Screensaver);
          setOpenItemIndex(-1);
          setActiveItemIndex(-1);
        }}
        onScreensaverEnd={() => setMode(Mode.Pathway)}
      />

      <Headline position={[-1, 2, 3]} />
      <Payoff position={[sceneLength - 23, 0, -2]} />

      {bubbles.map((view, i) => {
        return (
          <Bubble
            key={`circle=${i}`}
            index={i}
            view={view}
            texture={textures[view]}
            position={[i * bubbleDistance + 10, i % 2 === 0 ? -1.8 : 1.5, 0]}
            ref={(el) => {
              bubblesRef.current[i] = el;
            }}
            active={activeItemIndex == i && true}
            onActive={() => setMode(Mode.Detail)}
            setActiveItemIndex={setActiveItemIndex}
            open={openItemIndex == i && true}
            setOpenItemIndex={setOpenItemIndex}
            setMoveToIndex={setMoveToIndex}
          />
        );
      })}

      <DetailView
        ref={detailViewRef}
      />
    </>
  );
};
