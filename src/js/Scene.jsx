import { useRef, useLayoutEffect } from "react";
import { useThree } from "@react-three/fiber";
import { Text, Circle, OrbitControls, Line } from "@react-three/drei";
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
        position={[-8, 3.5, 0]}
        fontSize={1.8}
        maxWidth={16}
        letterSpacing={-0.08}
        lineHeight={0.8}
      >
        {t("main.title")}
      </Text>
      {[...Array(20)].map((x, i) => {
        return (
          <Line
            points={[
              [-100, i * 0.2 - 2, 0],
              [300, i * 0.2 - 2, 0],
            ]} // Array of points, Array<Vector3 | Vector2 | [number, number, number] | [number, number] | number>
            color="#00EEFA" // Default
            lineWidth={1} // In pixels (default)
            segments // If true, renders a THREE.LineSegments2. Otherwise, renders a THREE.Line2
            // Optional array of RGB values for each point
            // {...lineProps} // All THREE.Line2 props are valid
            // {...materialProps} // All THREE.LineMaterial props are valid
          />
        );
      })}

      {/* Bubbles */}
      {[...Array(7)].map((x, i) => {
        return (
          <Circle
            scale={[4, 4, 4]}
            position={[i * 25 + 10, -1, 0]}
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
