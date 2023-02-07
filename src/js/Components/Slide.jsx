// Translation context is lost in child elements for some reason,
// cloning slides and adding t function by props manually
import { cloneElement } from "react";
import { Html } from "@react-three/drei";
import { useTranslation } from "react-i18next";

const Slide = ({ position, children }) => {
  const { t } = useTranslation("common");
  return (
    <Html fullscreen zIndexRange={[100, 0]} position={position}>
      <section className={"slide"}>{cloneElement(children, { t })}</section>
    </Html>
  );
};

export default Slide;
