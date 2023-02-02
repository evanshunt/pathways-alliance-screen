import { useContext, useLayoutEffect } from "react";
import { useFrame } from "@react-three/fiber";

import { GlobalContext } from "../Context/GlobalContext";

const Camera = ({ sceneLength }) => {
  const GLOBAL = useContext(GlobalContext);
  useFrame((state, delta) => {
    // Update camera position to target, smoothly
    GLOBAL.cameraPositionLerped.lerp(GLOBAL.cameraPositionTarget, 4 * delta);
    state.camera.position.copy(GLOBAL.cameraPositionLerped);

    const sceneTravelled = state.camera.position.x / sceneLength;

    // Check if we've gone to the bounds and flip back
    if (sceneTravelled > 0.99) {
      GLOBAL.cameraPositionTarget.x = 0;
      GLOBAL.cameraPositionLerped.x = -0.5 * sceneLength;
      state.camera.position.x = -0.5 * sceneLength;
    }
  });

  useLayoutEffect(() => {
    if (GLOBAL.mode === GLOBAL.MODE.Screensaver) {
      GLOBAL.cameraPositionTarget.x = 0;
      GLOBAL.cameraPositionTarget.y = 15;
    } else if (GLOBAL.mode === GLOBAL.MODE.Pathway) {
      GLOBAL.cameraPositionTarget.x = 0;
      GLOBAL.cameraPositionTarget.y = 0;
    } else if (GLOBAL.mode === GLOBAL.MODE.Detail) {
      GLOBAL.cameraPositionTarget.y = -20;
    }
  }, [GLOBAL.mode]);
};

export default Camera;
