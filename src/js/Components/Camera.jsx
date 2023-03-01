import { useContext, useLayoutEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";

import { GlobalContext } from "../Context/GlobalContext";

const Camera = ({ sceneLength }) => {
  const GLOBAL = useContext(GlobalContext);

  useFrame((state, delta) => {
    // Update camera position to target, smoothly
    if (GLOBAL.cameraPositionLerped.current.distanceTo(GLOBAL.cameraPositionTarget.current) > 0.1) {
      GLOBAL.cameraPositionLerped.current.lerp(
        GLOBAL.cameraPositionTarget.current,
        4 * delta
      );
      state.camera.position.copy(GLOBAL.cameraPositionLerped.current);

      const sceneTravelled = state.camera.position.x / sceneLength;

      // Check if we've gone to the bounds and flip back
      if (sceneTravelled > 0.99) {
        GLOBAL.cameraPositionTarget.current.x = 0;
        GLOBAL.cameraPositionLerped.current.x = -0.5 * sceneLength;
        state.camera.position.x = -0.5 * sceneLength;
      }
    }
  });

  useLayoutEffect(() => {
    if (GLOBAL.mode === GLOBAL.MODE.Screensaver) {
      GLOBAL.cameraPositionTarget.current.x = 0;
      GLOBAL.cameraPositionTarget.current.y = 16;
    } else if (GLOBAL.mode === GLOBAL.MODE.Pathway) {
      GLOBAL.cameraPositionTarget.current.x = GLOBAL.lastPathwayPosition;
      GLOBAL.cameraPositionTarget.current.y = 0;
    } else if (GLOBAL.mode === GLOBAL.MODE.Detail) {
      GLOBAL.cameraPositionTarget.current.y = -13;
    }
  }, [GLOBAL.mode]);
};

export default Camera;
