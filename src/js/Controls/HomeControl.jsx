import { useRef, useContext } from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useTranslation } from "react-i18next";

import { GlobalContext } from "../Context/GlobalContext";

export default ({ openItemIndex, onPointerDown }) => {
  const GLOBAL = useContext(GlobalContext);
  const controlRef = useRef();
  const { t } = useTranslation("common");
  useFrame((state, delta) => {
    controlRef.current.position.x = GLOBAL.cameraPositionTarget.current.x;
    controlRef.current.position.y = GLOBAL.cameraPositionTarget.current.y;
  }, 1);

  return (
    <group ref={controlRef}>
      <Html fullscreen zIndexRange={[200, 100]}>
        <button
          id="home"
          disabled={GLOBAL.mode !== GLOBAL.MODE.Detail}
          onPointerDown={(event) => {
            event.stopPropagation();
            onPointerDown();
          }}
        >
          <span>
            <svg
              width="100"
              height="25"
              viewBox="0 0 100 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.8333 43.6667L2 22.8333L22.8333 2"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 22.834H97.8333"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span>{t("controls.home")}</span>
        </button>
      </Html>
    </group>
  );
};
