import { useRef, useState, useLayoutEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three';
import { Text, CubicBezierLine, useTexture } from "@react-three/drei";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import DragControl from './Controls/DragControl.jsx';
import Bubble from "./Components/Bubble.jsx";

const Scene = ({ bubblesRef, activeItemIndex, setActiveItemIndex, openItemIndex, setOpenItemIndex }) => {
  const textRef = useRef();
  const [ industryTexture ] = useTexture(['/industry.png'])
  const [ smoothedCameraPosition ] = useState(() => new THREE.Vector3());
  const [ modifiedCameraPosition ] = useState(() => new THREE.Vector3());
  const [ moveToIndex, setMoveToIndex] = useState(-1);
  const { t } = useTranslation("common");

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current.rotation,
        { y: -0.02 },
        { y: 0.02, duration: 5, yoyo: true, repeat: -1 }
      );
    });

    return () => ctx.revert();
  }, []);

  useLayoutEffect((state, delta) => {
    if (bubblesRef.current[moveToIndex] != null) {
      modifiedCameraPosition.lerp(bubblesRef.current[moveToIndex].position, 1);
      setMoveToIndex(-1);
    }
  }, [moveToIndex]);

  useFrame((state, delta) => {
    smoothedCameraPosition.lerp(modifiedCameraPosition, 5 * delta);
    state.camera.position.copy(smoothedCameraPosition);

    // Check if camera is near a bubble an activate it
    let closeMatch = false;
    bubblesRef.current.forEach((element, index) => {
      if (Math.abs(state.camera.position.x - element.position.x) < 8) {
        setActiveItemIndex(index);
        closeMatch = true;
      }
    });
    if (!closeMatch) {
      setActiveItemIndex(-1);
    }
  });

  return (
    <>
      <ambientLight intensity={1} />
      <DragControl 
        dragDisabled={openItemIndex == -1 && moveToIndex == -1 && true} 
        modifiedCameraPosition={modifiedCameraPosition} 
      />

      {/* Translatable text */}
      <Text
        ref={textRef}
        position={[-2, 4, 0]}
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
            index={i}
            texture={industryTexture}
            position={[i * 25 + 10, -1, 0]}
            ref={(el) => {
              bubblesRef.current[i] = el;
            }}
            active={activeItemIndex == i && true}
            setActiveItemIndex={setActiveItemIndex}
            open={openItemIndex == i && true}
            setOpenItemIndex={setOpenItemIndex}
            setMoveToIndex={setMoveToIndex}
          />
        );
      })}
    </>
  );
};

export default Scene;
