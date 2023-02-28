import { useRef, useState, useContext } from "react";
import { useFrame } from "@react-three/fiber";

import { GlobalContext } from "../Context/GlobalContext";

export default ({ sceneLength, isDragDisabled }) => {
  const GLOBAL = useContext(GlobalContext);
  const controlRef = useRef();
  const dragPointer = useRef(null);
  const currentDragPosition = useRef(null);
  const dragLength = useRef(0);

  const pointerDown = (event) => {
    // Only start a drag on the first finger press
    // And only if drag hasn't been disabled
    if (!dragPointer.current && !isDragDisabled) {
      dragPointer.current = event.pointerId;
      dragLength.current = 0;
      currentDragPosition.current = null;
    }
  };

  const pointerMove = (event) => {
    // Considering dragging calculations if the pointer
    // that's moving is the one that started the drag
    if (dragPointer.current === event.pointerId) {
      const newDragPosition = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      };
      if (currentDragPosition.current) {
        const dragMovement = {
          x: newDragPosition.x - currentDragPosition.current.x,
          y: newDragPosition.y - currentDragPosition.current.y,
        };
        GLOBAL.cameraPositionTarget.current.x -= dragMovement.x * 50;
        dragLength.current = dragLength.current + Math.abs(dragMovement.x);

        // Bounds of drag
        if (GLOBAL.cameraPositionTarget.current.x < 0)
          GLOBAL.cameraPositionTarget.current.x = 0;
        if (GLOBAL.cameraPositionTarget.current.x > sceneLength)
          GLOBAL.cameraPositionTarget.current.x = sceneLength;
      }
      currentDragPosition.current = newDragPosition;
    }
  };

  const pointerUp = (event) => {
    if (dragPointer.current === event.pointerId) {
      // If the user is in a proper drag, don't issue events to bubbles underneath
      // 0.02 is 2% of the viewport
      if (dragLength.current > 0.02) {
        event.stopPropagation();
      }
      dragPointer.current = null;
    }
  };

  useFrame((state, delta) => {
    controlRef.current.position.x = GLOBAL.cameraPositionLerped.current.x;
    controlRef.current.position.y = GLOBAL.cameraPositionLerped.current.y;
  });

  return (
    <mesh
      ref={controlRef}
      // Puts it close up to the camera
      // This doesn't feel amazing, would rather sync mesh size to viewable area by camera
      position={[0, 0, 9.9]}
      visible={false}
      onPointerDown={(event) => pointerDown(event)}
      onPointerMove={(event) => pointerMove(event)}
      onPointerUp={(event) => pointerUp(event)}
      onPointerLeave={(event) => pointerUp(event)}
    >
      <planeGeometry args={[10, 1]} />
    </mesh>
  );
};
