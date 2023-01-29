import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from 'three';
import { Text, OrbitControls, CubicBezierLine } from "@react-three/drei";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import Bubble from "./Components/Bubble";

const Scene = ({ bubblesRef, activeItemIndex, setActiveItemIndex, openItemIndex, setOpenItemIndex }) => {
  const textRef = useRef();
  const [ smoothedCameraPosition ] = useState(() => new THREE.Vector3());
  const [ modifiedCameraPosition ] = useState(() => new THREE.Vector3());
  const { t } = useTranslation("common");
  let dragPointer = false;
  let currentDragPosition = null;
  // let dragLength = null;

  const pointerStart = (event) => {
    // Retrieve openItemIndex from State outside of initial listener
    // https://stackoverflow.com/a/60316873/5683437
    setOpenItemIndex(openItemIndex => {
      if (!dragPointer && isNaN(openItemIndex)) {
        dragPointer = event.pointerId;
        // dragLength = 0;
        currentDragPosition = null;
      }
      return openItemIndex;
    });
  };

  const pointerMove = (event) => {
    if (dragPointer === event.pointerId) {
      const newDragPosition = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1
      }
      if (currentDragPosition) {
        const dragMovement = {
          x: newDragPosition.x - currentDragPosition.x,
          y: newDragPosition.y - currentDragPosition.y
        }
        modifiedCameraPosition.x -= dragMovement.x * 50;
        // dragLength -= dragMovement.x;
        if (modifiedCameraPosition.x < 0) modifiedCameraPosition.x = 0;
      }
      // if (Math.abs(dragLength) > 0.5) {
      //   setActiveItemIndex(null);
      // }
      currentDragPosition = newDragPosition;
    }
  };

  const pointerEnd = (event) => {
    if (dragPointer === event.pointerId) {
      dragPointer = false;
    }
  };

  useEffect(() => {
    window.addEventListener("pointermove", (event) => pointerMove(event));
    window.addEventListener("pointerdown", (event) => pointerStart(event));
    window.addEventListener("pointerup", (event) => pointerEnd(event));

    return () => {
      window.removeEventListener("pointermove", (event) => pointerMove(event));
      window.removeEventListener("pointerdown", (event) => pointerStart(event));
      window.removeEventListener("pointerup", (event) => pointerEnd(event));
    };
  }, []);

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

  useLayoutEffect(() => {
    if (activeItemIndex != null) {
      gsap.to(modifiedCameraPosition, {
        x: bubblesRef.current[activeItemIndex].position.x,
      });
    }
  }, [activeItemIndex]);

  useFrame((state, delta) => {
    smoothedCameraPosition.lerp(modifiedCameraPosition, 5 * delta);
    state.camera.position.copy(smoothedCameraPosition);

    // Check if camera is near a bubble an activate it
    bubblesRef.current.forEach((element, index) => {
      if (Math.abs(state.camera.position.x - element.position.x) < 3) {
        setActiveItemIndex(index);
      }
    });
  });

  return (
    <>
      <ambientLight intensity={1} />
      <OrbitControls enableRotate={false} enableZoom={false} />

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
            position={[i * 25 + 10, -1, 0]}
            ref={(el) => {
              bubblesRef.current[i] = el;
            }}
            active={activeItemIndex == i && true}
            setActiveItemIndex={setActiveItemIndex}
            open={openItemIndex == i && true}
            setOpenItemIndex={setOpenItemIndex}
          />
        );
      })}
    </>
  );
};

export default Scene;
