import { forwardRef, useState, useLayoutEffect, useRef, useImperativeHandle } from 'react';
import { useFrame } from "@react-three/fiber";
import { Circle } from "@react-three/drei";
import * as THREE from 'three';

export default forwardRef(function({position, onPointerDown, active=false}, ref) {
  const circleRef = useRef();
  useImperativeHandle(ref, () => circleRef.current);
  const [scale] = useState(() => new THREE.Vector3(1, 1, 1));
  const [smoothedScale] = useState(() => new THREE.Vector3(1, 1, 1));

  useLayoutEffect(() => {
    if (active) {
      scale.copy(new THREE.Vector3(2, 2, 2));
    }
    else {
      scale.copy(new THREE.Vector3(1, 1, 1));
    }
  }, [active]);

  useFrame((state, delta) => {
    smoothedScale.lerp(scale, 0.1);
    circleRef.current.scale.copy(smoothedScale);
  });

  return(
    <Circle 
      args={[2,64]}
      ref={circleRef}
      position={position}
      onPointerDown={onPointerDown}
    >
      <meshStandardMaterial
        color={active ? "green" : "hotpink"}
      />
    </Circle>
  );
});
