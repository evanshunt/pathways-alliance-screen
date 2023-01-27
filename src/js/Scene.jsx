import { useRef, useLayoutEffect } from "react";
import { useThree } from "@react-three/fiber";
import { Text, OrbitControls, CubicBezierLine } from "@react-three/drei";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import Bubble from "./Bubble";

const Scene = ({ bubblesRef, activeItemIndex, setActiveItemIndex }) => {
  const textRef = useRef();

  const { t } = useTranslation("common");
  const threeState = useThree();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current.rotation,
        { y: -0.02 },
        { y: 0.02, duration: 5, yoyo: true, repeat: -1 }
      );
    });

    const bubbleTimeline = gsap.timeline();
    bubblesRef.current.forEach((el, index) => {
      bubbleTimeline.to(
        el.position,
        {
          y: 1,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          duration: 7,
        },
        index * 2
      );
    });

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (activeItemIndex != null) {
      gsap.to(threeState.camera.position, {
        x: bubblesRef.current[activeItemIndex].position.x,
      });
    }
  }, [activeItemIndex]);

  return (
    <>
      <ambientLight intensity={1} />
      <OrbitControls enableRotate={false} enableZoom={false} />

      {/* Translatable text */}
      <Text
        ref={textRef}
        position={[-5, 4, 0]}
        fontSize={1.8}
        maxWidth={16}
        letterSpacing={-0.08}
        lineHeight={0.8}
      >
        {t("main.title")}
      </Text>
      {[...Array(20)].map((x, i) => {
        return (
          <CubicBezierLine
            start={[-25, 0 + 0.2 * i, 0]}
            end={[20, 0 + 0.2 * i, 0]}
            midA={[0, -8 + 0.2 * i, 0]}
            midB={[0, 8 + 0.2 * i, 0]}
            color="#00EEFA" // Default
            lineWidth={1} // In pixels (default)
            segments={100} // If true, renders a THREE.LineSegments2. Otherwise, renders a THREE.Line2
            key={`line-${i}`}
          />
        );
      })}

      {/* Bubbles */}
      {[...Array(7)].map((x, i) => {
        return (
          <Bubble
            key={`circle=${i}`}
            scale={[4, 4, 4]}
            position={[i * 25 + 10, -1, 0]}
            ref={(el) => {
              bubblesRef.current[i] = el;
            }}
            active={activeItemIndex == i && true}
            onPointerDown={() => {
              setActiveItemIndex(i);
            }}
          />
        );
      })}
    </>
  );
};

export default Scene;
