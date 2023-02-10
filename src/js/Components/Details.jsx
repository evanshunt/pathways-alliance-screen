import { useRef, useContext } from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import { GlobalContext } from "../Context/GlobalContext";

import DetailUniting from "./Details/DetailUniting";
import DetailDirecting from "./Details/DetailDirecting";
import DetailCapturing from "./Details/DetailCapturing";
import DetailTransport from "./Details/DetailTransport";
import DetailStorage from "./Details/DetailStorage";
import DetailInnovation from "./Details/DetailInnovation";

export default ({ openItemIndex }) => {
  const GLOBAL = useContext(GlobalContext);
  const ref = useRef();
  const detailViews = [
    <DetailUniting />,
    <DetailDirecting />,
    <DetailCapturing />,
    <DetailTransport />,
    <DetailStorage />,
    <DetailInnovation />,
  ];

  useFrame(() => {
    if (GLOBAL.mode === GLOBAL.MODE.Detail) {
      ref.current.position.x = GLOBAL.cameraPositionLerped.current.x;
      ref.current.position.y = GLOBAL.cameraPositionLerped.current.y;
    }
  }, 1);
  return (
    <group ref={ref} position={[0, -20, 0]}>
      <Html fullscreen zIndexRange={[100, 0]}>
        <section
          className={
            GLOBAL.mode === GLOBAL.MODE.Detail
              ? "detailview active"
              : "detailview inactive"
          }
        >
          {GLOBAL.mode === GLOBAL.MODE.Detail && detailViews[openItemIndex]}
        </section>
      </Html>
    </group>
  );
};
