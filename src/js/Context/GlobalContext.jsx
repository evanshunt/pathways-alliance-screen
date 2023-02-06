import { createContext } from "react";

// Defaults for global vars, actual assignment is in the Experience component
// passed through the GlobalContext.Provider
export const GlobalContext = createContext({
  MODE: {},
  mode: "",
  setMode: () => {},
  cameraPositionTarget: null,
  cameraPositionLerped: null,
  lastPathwayPosition: 0
});
