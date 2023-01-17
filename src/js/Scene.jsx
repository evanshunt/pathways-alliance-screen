import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Text, Circle } from "@react-three/drei";
import gsap from "gsap";
import { useTranslation } from "react-i18next";

import Autopilot from "./Autopilot";

const Scene = () => {
  const textRef = useRef();
  const items = useRef([]);
  const [activeItemIndex, setActiveItemIndex] = useState(null);
  const { t, i18n } = useTranslation("common");

  const handleAutopilotIntervalComplete = () => {
    if (
      activeItemIndex === null ||
      activeItemIndex === items.current.length - 1
    ) {
      setActiveItemIndex(0);
    } else {
      setActiveItemIndex(activeItemIndex + 1);
    }
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current.rotation,
        { y: -0.025 },
        { y: 0.025, duration: 3, yoyo: true, repeat: -1 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Autopilot */}
      <Autopilot
        activeTimeout={5} // How long before autopilot starts
        interval={2} // How long between onIntervalComplete callbacks
        onIntervalComplete={handleAutopilotIntervalComplete}
      />

      {/* Translatable text */}
      <Text
        ref={textRef}
        position={[0, 2, 0]}
        textAlign="center"
        maxWidth={10}
        letterSpacing={-0.08}
        lineHeight={0.8}
      >
        {t("main.title", { test: "Test" })}
      </Text>

      {/* Bubbles */}
      {[...Array(6)].map((x, i) => {
        return (
          <Circle
            scale={[0.5, 0.5, 0.5]}
            position={[-5 + i * 2, 0, 0]}
            key={`circle=${i}`}
            ref={(el) => {
              items.current[i] = el;
            }}
            onPointerDown={() => {
              setActiveItemIndex(i);
            }}
          >
            <meshStandardMaterial
              color={activeItemIndex === i ? "green" : "hotpink"}
            />
          </Circle>
        );
      })}

      {/* Language controls */}
      <Text
        ref={textRef}
        position={[-1, -3.5, 0]}
        textAlign="center"
        maxWidth={5}
        letterSpacing={-0.08}
        lineHeight={0.8}
        onPointerDown={() => i18n.changeLanguage("en")}
      >
        En
      </Text>
      <Text
        ref={textRef}
        position={[1, -3.5, 0]}
        textAlign="center"
        maxWidth={5}
        letterSpacing={-0.08}
        lineHeight={0.8}
        onPointerDown={() => i18n.changeLanguage("fr")}
      >
        Fr
      </Text>
    </>
  );
};

export default Scene;
