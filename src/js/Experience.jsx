import { Html, MapControls } from "@react-three/drei";
import Scene from "./Scene";

// TODO:
// Use react-i18next for english/french translation?
// Or maybe write our own
// Add wave pattern

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
