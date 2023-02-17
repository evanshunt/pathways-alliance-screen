import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";

import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

import Experience from "./js/Experience.jsx";
import LanguageControl from "./js/Controls/LanguageControl.jsx";

import common_en from "../translations/en/common.json";
import common_fr from "../translations/fr/common.json";

const queryString = new URLSearchParams(window.location.hash.slice(1));
const debug = queryString.has("debug");

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

i18next.init({
  interpolation: {
    escapeValue: false, // React already does escaping
  },
  lng: "en", // language to use
  resources: {
    en: {
      common: common_en, // 'common' is our custom namespace
    },
    fr: {
      common: common_fr,
    },
  },
});

if (debug) {
  rootElement.classList.add("debug");
} else {
  rootElement.classList.add("prod");
}

root.render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <Leva hidden={debug ? false : true} collapsed />
      <Canvas
        id="canvas"
        dpr={[1, 2]}
        camera={{
          position: [0, 0, 0],
        }}
      >
        <Experience debug={debug} />
      </Canvas>
      {/* <LanguageControl /> */}
    </I18nextProvider>
  </StrictMode>
);
