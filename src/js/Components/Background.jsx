import { useRef, useContext } from "react";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GlobalContext } from "../Context/GlobalContext";

const Background = ({ sceneLength }) => {
  const backgroundRef = useRef();

  const backgroundStartColour = new THREE.Color(0x252154);
  const backgroundEarlyMidColour = new THREE.Color(0x163bae);
  const backgroundLateMidColour = new THREE.Color(0x0c4eea);
  const backgroundEndColour = new THREE.Color(0x00eefa);

  const GLOBAL = useContext(GlobalContext);

  useFrame((state, delta) => {
    // Set background colour based on position
    let backgroundColour = new THREE.Color();
    let sceneTravelled = state.camera.position.x / sceneLength;
    // Unless we're in screensaver, then lock the background colour
    if (GLOBAL.mode === GLOBAL.MODE.Screensaver) { 
      sceneTravelled = 0.5;
    }
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
    else if (sceneTravelled <= 0.9)
      backgroundColour.lerpColors(
        backgroundLateMidColour,
        backgroundEndColour,
        (sceneTravelled - 0.7) / 0.2
      );
    else backgroundColour.copy(backgroundEndColour);

    backgroundRef.current.r = backgroundColour.r;
    backgroundRef.current.g = backgroundColour.g;
    backgroundRef.current.b = backgroundColour.b;
  });

  return (
    <>
      <EffectComposer>
         <Vignette eskil={true} offset={0.5} darkness={0.5} />
       </EffectComposer>
      <ambientLight intensity={1} />
      <color ref={backgroundRef} attach="background" />
    </>
  );
};

export default Background;
