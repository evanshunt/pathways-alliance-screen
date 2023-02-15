import { useContext } from "react";
import { Html, Hud, PerspectiveCamera } from "@react-three/drei";
import { useTranslation } from "react-i18next";

import { GlobalContext } from "../Context/GlobalContext";

export default () => {
  const GLOBAL = useContext(GlobalContext);
  const { t } = useTranslation("common");

  return (
    <Hud>
      <PerspectiveCamera makeDefault position={[0, 0, 1]} />
      <Html fullscreen zIndexRange={[200, 100]}>
        <button id="tap" disabled={GLOBAL.mode !== GLOBAL.MODE.Screensaver}>
          <svg
            width="72"
            height="72"
            viewBox="0 0 145 145"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M39.1319 93.3377C35.4152 87.3895 33.3594 80.5545 33.1782 73.5429C32.9969 66.5314 34.6968 59.5993 38.1011 53.467C41.5055 47.3347 46.4901 42.2261 52.5369 38.6721C58.5836 35.118 65.4719 33.2483 72.4858 33.2572C79.4997 33.2661 86.3832 35.1534 92.4209 38.7227C98.4586 42.2921 103.43 47.4134 106.819 53.5543C110.208 59.6952 111.89 66.6317 111.691 73.6427C111.492 80.6538 109.419 87.4836 105.687 93.4223"
              stroke="#07EDF8"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M30.1599 111.348C22.6277 103.148 17.6431 92.9346 15.8135 81.9518C13.9838 70.9691 15.3881 59.6912 19.8552 49.4925C24.3223 39.2937 31.6594 30.6145 40.9723 24.5122C50.2853 18.41 61.1721 15.1482 72.3063 15.1244C83.4404 15.1006 94.3411 18.3157 103.68 24.378C113.019 30.4404 120.393 39.0882 124.904 49.2677C129.415 59.4472 130.867 70.719 129.084 81.7095C127.302 92.7 122.361 102.935 114.864 111.167"
              stroke="#07EDF8"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M63.3531 69.4792C63.3531 67.8768 63.9896 66.3401 65.1227 65.2071C66.2557 64.074 67.7924 63.4375 69.3948 63.4375C70.9971 63.4375 72.5338 64.074 73.6669 65.2071C74.7999 66.3401 75.4364 67.8768 75.4364 69.4792V98.2012L99.1198 105.27C101.023 105.818 102.644 107.075 103.648 108.783C104.652 110.49 104.962 112.518 104.515 114.447C103.73 117.855 100.014 138.614 99.3856 142.094H62.4106L43.9171 114.393C36.5764 103.167 55.0096 99.2888 63.3531 117.951V69.4792Z"
              stroke="#07EDF8"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="highlight">{t("controls.tap")}</span>
        </button>
      </Html>
    </Hud>
  );
};
