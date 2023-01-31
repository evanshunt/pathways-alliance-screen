import { forwardRef } from "react";
import { Html } from "@react-three/drei";
import { useTranslation } from "react-i18next";

export default forwardRef(({ openItemIndex, onPointerDown }, ref) => {
  const { t } = useTranslation("common");

  return (
    <group ref={ref}>
      <Html
        fullscreen
        zIndexRange={[200, 100]}
        // Not sure why I need this rule
        style={{
          transform: "translate(50%, 50%)",
        }}
      >
        <button
          id="home"
          disabled={openItemIndex > -1 ? false : true}
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
});
