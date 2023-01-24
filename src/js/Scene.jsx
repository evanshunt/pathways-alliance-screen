import { useRef, useLayoutEffect } from "react";
import { useThree } from "@react-three/fiber";
import { Text, Circle, OrbitControls } from "@react-three/drei";
import { useTranslation } from "react-i18next";
import gsap from "gsap";

const Scene = ({ bubblesRef, activeItemIndex, setActiveItemIndex }) => {
  const textRef = useRef();

  const { t } = useTranslation("common");
  const threeState = useThree();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current.rotation,
        { y: -0.05 },
        { y: 0.05, duration: 3, yoyo: true, repeat: -1 }
      );
    });

    const bubbleTimeline = gsap.timeline();
    bubblesRef.current.forEach((el, index) => {
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
        position={[0, 2, 0]}
        textAlign="center"
        maxWidth={10}
        letterSpacing={-0.08}
        lineHeight={0.8}
      >
        {t("main.title")}
      </Text>

      {/* Bubbles */}
      {[...Array(7)].map((x, i) => {
        return (
          <Circle
            scale={[0.5, 0.5, 0.5]}
            position={[i * 15, -0.5, 0]}
            key={`circle=${i}`}
            ref={(el) => {
              bubblesRef.current[i] = el;
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
