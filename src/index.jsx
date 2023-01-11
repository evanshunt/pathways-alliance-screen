import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./js/Experience.jsx";
import { Leva } from "leva";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Leva collapsed />
    <Canvas>
      <Experience />
    </Canvas>
  </StrictMode>
);
