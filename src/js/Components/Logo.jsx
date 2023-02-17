import { Html, Hud, PerspectiveCamera } from "@react-three/drei";

export default () => {
  return (
    <Hud>
      <PerspectiveCamera makeDefault position={[0, 0, 1]} />
      <Html fullscreen zIndexRange={[200, 100]}>
        <div id="logo-pathways">
          <img src="/images/logo-pathways.svg" alt="Pathways Alliance Logo" />
        </div>
      </Html>
    </Hud>
  );
};
