import { useRef } from "react";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Background = ({
  sceneLength,
  modifiedCameraPosition,
  smoothedCameraPosition,
}) => {
  const backgroundRef = useRef();

  const backgroundStartColour = new THREE.Color(0x252154);
  const backgroundEarlyMidColour = new THREE.Color(0x163bae);
  const backgroundLateMidColour = new THREE.Color(0x0c4eea);
  const backgroundEndColour = new THREE.Color(0x00eefa);

  useFrame((state, delta) => {
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
      <EffectComposer>
        <Vignette eskil={true} offset={0.5} darkness={0.5} />
      </EffectComposer>
      <ambientLight intensity={1} />
      <color ref={backgroundRef} attach="background" />
    </>
  );
};

export default Background;
