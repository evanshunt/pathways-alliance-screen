import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Text, Circle } from "@react-three/drei";
import gsap from "gsap";

import Autopilot from "./Autopilot";

const Scene = () => {
  const textRef = useRef();
  const items = useRef([]);
  const [activeItemIndex, setActiveItemIndex] = useState(null);

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
      <Autopilot
        activeTimeout={5} // How long before autopilot starts
        interval={2} // How long between onIntervalComplete callbacks
        onIntervalComplete={handleAutopilotIntervalComplete}
      />

      <Text
        ref={textRef}
        position={[0, 2, 0]}
        textAlign="center"
        maxWidth={10}
        letterSpacing={-0.08}
        lineHeight={0.8}
      >
        There is no single path to net zero.
      </Text>

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
    </>
  );
};

export default Scene;
