import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./js/Experience.jsx";
import { Leva } from "leva";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

const root = ReactDOM.createRoot(document.getElementById("root"));

i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
});

root.render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <Leva collapsed />
      <Canvas style={{ background: "#0c4be6" }}>
        <Experience />
      </Canvas>
    </I18nextProvider>
  </StrictMode>
);
