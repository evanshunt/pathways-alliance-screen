import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./js/Experience.jsx";
import { Leva } from "leva";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

import common_en from "../translations/en/common.json";
import common_fr from "../translations/fr/common.json";

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
      <Leva collapsed />
      <Canvas
        style={{ background: "#0c4be6" }}
        camera={{ position: [0, 0, 10] }}
      >
        <Experience />
      </Canvas>
    </I18nextProvider>
  </StrictMode>
);
