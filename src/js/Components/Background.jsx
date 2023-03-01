import { useRef, useContext, useMemo } from "react";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GlobalContext } from "../Context/GlobalContext";
import BackgroundShader from "../Shaders/BackgroundShader";

const Background = ({ sceneLength }) => {
  const backgroundMaterialRef = useRef();
  const backgroundMeshRef = useRef();

  const backgroundStartColour = new THREE.Color(0x1D308A);
  const backgroundEarlyMidColour = new THREE.Color(0x0F46D6);
  const backgroundLateMidColour = new THREE.Color(0x0C4DE9);
  const backgroundEndColour = new THREE.Color(0x0698F1);

  const uniforms = useMemo(
    () => ({
      colour: {value: backgroundStartColour}
    }),
    []
  );

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

    console.log(backgroundColour);
    backgroundMaterialRef.current.uniforms.colour.value.r = backgroundColour.r;
    backgroundMaterialRef.current.uniforms.colour.value.g = backgroundColour.g;
    backgroundMaterialRef.current.uniforms.colour.value.b = backgroundColour.b;

    backgroundMeshRef.current.position.x = GLOBAL.cameraPositionLerped.current.x;
    backgroundMeshRef.current.position.y = GLOBAL.cameraPositionLerped.current.y;
  });

  return (
    <>
      {/* <EffectComposer>
         <Vignette eskil={true} offset={0.5} darkness={0.5} />
       </EffectComposer> */}
      <ambientLight intensity={1} />
      <mesh ref={backgroundMeshRef} position={[0,0,-50]}>
        <planeGeometry args={[180, 120]} />
        <shaderMaterial
          ref={backgroundMaterialRef}
          attach="material"
          fragmentShader={BackgroundShader.fragmentShader}
          vertexShader={BackgroundShader.vertexShader}
          uniforms={uniforms}
        />
      </mesh>
    </>
  );
};

export default Background;
