import { useMemo, useRef, useState, useLayoutEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three';
import { Text, CubicBezierLine, useTexture } from "@react-three/drei";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import DragControl from './Controls/DragControl.jsx';
import Bubble from "./Components/Bubble.jsx";

const Scene = ({ bubblesRef, activeItemIndex, setActiveItemIndex, openItemIndex, setOpenItemIndex }) => {
  const textRef = useRef();
  const textures = useTexture({
    capture: '/images/capture.png',
    dollars: '/images/dollars.png',
    industry: '/images/industry.png',
    innovation: '/images/innovation.png',
    network: '/images/network.png',
    storage: '/images/storage.png'
  });
  const [ smoothedCameraPosition ] = useState(() => new THREE.Vector3());
  const [ modifiedCameraPosition ] = useState(() => new THREE.Vector3());
  const [ moveToIndex, setMoveToIndex] = useState(-1);
  const { t } = useTranslation("common");
  const bubbles = [
    'industry',
    'dollars',
    'capture',
    'network',
    'storage',
    'innovation'
  ]

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
    // If a bubble has been activated, move the camera to it
    if (bubblesRef.current[moveToIndex] != null) {
      modifiedCameraPosition.lerp(new THREE.Vector3(bubblesRef.current[moveToIndex].position.x + 3, 0, 0), 1);
      setMoveToIndex(-1);
    }
  }, [moveToIndex]);

  useFrame((state, delta) => {
    // Pull the camera towards the new position, smoothly
    smoothedCameraPosition.lerp(modifiedCameraPosition, 5 * delta);
    state.camera.position.copy(smoothedCameraPosition);

    // Check if camera is near a bubble and activate it
    let closeMatch = false;
    bubblesRef.current.forEach((element, index) => {
      if (Math.abs(state.camera.position.x - (element.position.x + 3)) < 6) {
        setActiveItemIndex(index);
        closeMatch = true;
      }
    });
    // Otherwise close the bubbles
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
      {bubbles.map((view, i) => {
        return (
          <Bubble
            key={`circle=${i}`}
            index={i}
            view={view}
            texture={textures[view]}
            position={[i * 16 + 10, -1, 0]}
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
