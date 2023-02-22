import { useRef, useContext } from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useTranslation } from "react-i18next";

import { GlobalContext } from "../Context/GlobalContext";

export default ({ onPointerDown }) => {
  const GLOBAL = useContext(GlobalContext);
  const controlRef = useRef();
  const { t } = useTranslation("common");
  useFrame((state, delta) => {
    controlRef.current.position.x = GLOBAL.cameraPositionTarget.current.x;
    controlRef.current.position.y = GLOBAL.cameraPositionTarget.current.y;
  }, 1);

  return (
    <group ref={controlRef}>
      <Html fullscreen zIndexRange={[300, 100]} position={[0, 0, -2]}>
        <button
          className="highlight"
          id="back"
          disabled={GLOBAL.mode !== GLOBAL.MODE.Detail}
          onPointerDown={(event) => {
            onPointerDown();
          }}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="46"
              height="50"
              fill="none"
              viewBox="0 0 46 50"
              preserveAspectRatio="xMinYMin meet"
            >
              <path
                fill="#07EDF8"
                fillRule="evenodd"
                d="M42.606 23.894a1.5 1.5 0 1 0 2.121-2.121L24.39 1.435a1.5 1.5 0 0 0-1.474-.933 1.506 1.506 0 0 0-1.143.437L.939 21.773a1.5 1.5 0 1 0 2.122 2.121L21.5 5.455V48a1.5 1.5 0 1 0 3 0V5.788l18.106 18.106Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span>{t("controls.back")}</span>
        </button>
      </Html>
    </group>
  );
};
