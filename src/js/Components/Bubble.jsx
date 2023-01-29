import { forwardRef, useState, useLayoutEffect, useRef, useImperativeHandle } from 'react';
import { useFrame } from "@react-three/fiber";
import { Circle } from "@react-three/drei";
import * as THREE from 'three';
import DetailViewCollaboration from './DetailViewCollaboration';

export default forwardRef(function({index, position, onPointerDown, active=false, setActiveItemIndex, open=false, setOpenItemIndex}, ref) {
  const circleRef = useRef();
  useImperativeHandle(ref, () => circleRef.current);
  const [scale] = useState(() => new THREE.Vector3());
  const [smoothedScale] = useState(() => new THREE.Vector3());

  const pointerDown = (event) => {
    if (active) {
      setOpenItemIndex(index);
    }
    else {
      setActiveItemIndex(index);
    }
  }

  useLayoutEffect(() => {
    if (active) {
      scale.copy(new THREE.Vector3(1, 1, 1));
    }
    else {
      scale.copy(new THREE.Vector3(0.5, 0.5, 0.5));
      setOpenItemIndex();
    }
  }, [active]);

  useFrame((state, delta) => {
    smoothedScale.lerp(scale, 0.1);
    circleRef.current.scale.copy(smoothedScale);
    circleRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5 + index);
  });

  return(
    <Circle 
      args={[4,64]}
      ref={circleRef}
      position={position}
      onPointerUp={pointerDown}
    >
      <meshStandardMaterial
        color={active ? "green" : "hotpink"}
      />
      { open && <DetailViewCollaboration />}
    </Circle>
  );
});
