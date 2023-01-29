import { forwardRef } from "react";

export default forwardRef(({dragDisabled, modifiedCameraPosition}, ref) => {
  let dragPointer = false;
  let currentDragPosition = null;
  let dragLength = 0;

  const pointerDown = (event) => {
    // Only start a drag on the first finger press
    // And only if drag hasn't been disabled
    if (!dragPointer && dragDisabled) {
      dragPointer = event.pointerId;
      dragLength = 0;
      currentDragPosition = null;
    }
  };

  const pointerMove = (event) => {
    // Considering dragging calculations if the pointer 
    // that's moving is the one that started the drag
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
        dragLength += Math.abs(dragMovement.x);
        if (modifiedCameraPosition.x < 0) modifiedCameraPosition.x = 0;
      }
      currentDragPosition = newDragPosition;
    }
  };

  const pointerUp = (event) => {
    if (dragPointer === event.pointerId) {
      dragPointer = false;
      // If the user is in a proper drag, don't issue events to bubbles underneath
      // 0.05 is 5% of the viewport
      if (dragLength > 0.05) {
        event.stopPropagation();
      }
    }
  };

  return (
    <mesh ref={ref}
    // Puts it close up to the camera
    // This doesn't feel amazing, would rather sync mesh size to viewable area by camera
    position={[0,0,9.9]} 
    visible={false}
    onPointerDown={(event) => pointerDown(event)}
    onPointerMove={(event) => pointerMove(event)}
    onPointerUp={(event) => pointerUp(event)}
    >
    <planeGeometry args={[1, 1]} />
    </mesh>
  );
});
