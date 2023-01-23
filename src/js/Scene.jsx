import { useState, useRef, useLayoutEffect } from "react";
import { useThree } from "@react-three/fiber";
import { Text, Circle, OrbitControls } from "@react-three/drei";
import { useTranslation } from "react-i18next";
import gsap from "gsap";

import Autopilot from "./Autopilot";

const Scene = () => {
  const textRef = useRef();
  const items = useRef([]);
  const [activeItemIndex, setActiveItemIndex] = useState(null);
  const { t } = useTranslation("common");
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

    const bubbleTimeline = gsap.timeline();

    items.current.forEach((el, index) => {
      bubbleTimeline.to(
        el.position,
        {
          y: 0.5,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          duration: 5,
        },
        index * 2
      );
    });

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (activeItemIndex != null) {
      gsap.to(threeState.camera.position, {
        x: items.current[activeItemIndex].position.x,
      });
    }
  }, [activeItemIndex]);

  return (
    <>
      <ambientLight intensity={1} />
      <OrbitControls enableRotate={false} enableZoom={false} />
      <Autopilot
        activeTimeout={60} // How long before autopilot starts
        interval={5} // How long between onIntervalComplete callbacks
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
            position={[i * 15, -0.5, 0]}
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
    </>
  );
};

export default Scene;
