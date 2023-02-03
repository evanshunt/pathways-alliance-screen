import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";

import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

import Experience from "./js/Experience.jsx";
import LanguageControl from "./js/Controls/LanguageControl.jsx";

import common_en from "../translations/en/common.json";
import common_fr from "../translations/fr/common.json";

const queryString = new URLSearchParams(window.location.hash.slice(1));
const debug = queryString.has("debug");

const root = ReactDOM.createRoot(document.getElementById("root"));
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

root.render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <Canvas
        camera={{
          position: [0, 0, 0],
        }}
      >
        <Experience debug={debug} />
      </Canvas>
      <LanguageControl />
    </I18nextProvider>
  </StrictMode>
);
