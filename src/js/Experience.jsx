import { Html, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import Scene from "./Scene";

// TODO:
// Add wave pattern
// Create motion with camera to move from bubble to bubble
// Scale bubbles when they are active
// Add polish like slight shake to an element when it's touched
// Setup a separate camera to display UI controls (language switching and left/right arrows)

const Experience = () => {
  useFrame((state) => {
    // Lock camera to x-axis while panning
    state.camera.position.y = 0;
    state.camera.position.z = 10;
    state.camera.rotation.x = 0;
    state.camera.rotation.y = 0;
    state.camera.rotation.z = 0;
  });

  return (
    <>
      <OrbitControls enableRotate={false} enableZoom={false} />
      <ambientLight intensity={1} />

      <Scene />
    </>
  );
};

export default Experience;
