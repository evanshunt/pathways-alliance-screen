import { forwardRef } from 'react';
import { Circle } from "@react-three/drei";

export default forwardRef(function({scale=[4, 4, 4], position, onPointerDown, active=false}, ref) {
  return(
    <Circle 
      ref={ref}
      scale={scale}
      position={position}
      onPointerDown={onPointerDown}
    >
      <meshStandardMaterial
        color={active ? "green" : "hotpink"}
      />
    </Circle>
  );
});
