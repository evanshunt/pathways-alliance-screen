import { useRef } from "react";
import { Text } from "@react-three/drei";
import { useTranslation } from "react-i18next";

export default ({ position }) => {
  const { t } = useTranslation("common");
  const textRef = useRef();

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={1.2}
      maxWidth={10}
      letterSpacing={-0.08}
      lineHeight={0.8}
    >
      {t("main.title")}
    </Text>
  );
};
