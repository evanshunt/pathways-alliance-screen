import { useState, useRef, useLayoutEffect } from "react";
import { useThree } from "@react-three/fiber";
import { Text, Circle } from "@react-three/drei";
import { useTranslation } from "react-i18next";
import gsap from "gsap";

import Autopilot from "./Autopilot";

const Scene = () => {
  const textRef = useRef();
  const items = useRef([]);
  const [activeItemIndex, setActiveItemIndex] = useState(null);
  const { t, i18n } = useTranslation("common");
  const threeState = useThree();

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
        { y: -0.05 },
        { y: 0.05, duration: 3, yoyo: true, repeat: -1 }
      );
    });
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (activeItemIndex) {
      gsap.to(threeState.camera.position, {
        x: items.current[activeItemIndex].position.x,
      });
    }
  }, [activeItemIndex]);

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
        {t("main.title")}
      </Text>

      {/* Bubbles */}
      {[...Array(6)].map((x, i) => {
        return (
          <Circle
            scale={[0.5, 0.5, 0.5]}
            position={[-25 + i * 10, 0, 0]}
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
