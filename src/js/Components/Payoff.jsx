import { useRef } from "react";
import { Text } from "@react-three/drei";
import { useTranslation } from "react-i18next";

export default ({position}) => {
  const { t } = useTranslation("common");
  const textRef = useRef();

  return ( 
    <Text
      ref={textRef}
      position={position}
      fontSize={3}
      maxWidth={12}
      letterSpacing={-0.08}
      lineHeight={0.8}
      anchorX={"center"}
      anchorY={"middle"}
    >
      {t("main.payoff")}
    </Text>
  );
}
