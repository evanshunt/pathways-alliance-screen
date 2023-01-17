import { Html, MapControls } from "@react-three/drei";
import Scene from "./Scene";

// TODO:
// Use react-i18next for english/french translation?
// Or maybe write our own
// Add wave pattern
// Create motion with camera to move from bubble to bubble
// Scale bubbles when they are active

const Experience = () => {
  return (
    <>
      <MapControls enableRotate={false} enableZoom={false} />
      <ambientLight intensity={1} />

      <Scene />
    </>
  );
};

export default Experience;
