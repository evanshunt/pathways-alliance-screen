import { forwardRef, useState, useLayoutEffect, useRef, useImperativeHandle } from 'react';
import { useFrame } from "@react-three/fiber";
import { Circle } from "@react-three/drei";
import * as THREE from 'three';
import DetailViewCollaboration from './DetailViewCollaboration';

export default forwardRef(function({index, position, active=false, setMoveToIndex, open=false, setOpenItemIndex}, ref) {
  const circleRef = useRef();
  useImperativeHandle(ref, () => circleRef.current);
  const [scale] = useState(() => new THREE.Vector3());
  const [smoothedScale] = useState(() => new THREE.Vector3());
  const [bubbleTime, setBubbleTime] = useState(0);

  const pointerDown = (event) => {
    if (active) {
      setOpenItemIndex(index);
    }
    else {
      setMoveToIndex(index);
    }
  }

  useLayoutEffect(() => {
    if (active) {
      scale.copy(new THREE.Vector3(2, 2, 2));
    }
    else {
      scale.copy(new THREE.Vector3(1, 1, 1));
      setOpenItemIndex(-1);
    }
  }, [active]);

  useLayoutEffect(() => {
    if (open) {
      // This isn't satisfactory
      // We will need to make sure the camera locks onto the exact dimensions
      scale.copy(new THREE.Vector3(10, 10, 10));
    }
    else {
      scale.copy(new THREE.Vector3(1, 1, 1));
      setOpenItemIndex(-1);
    }
  }, [open]);

  useFrame((state, delta) => {
    smoothedScale.lerp(scale, 0.1);
    circleRef.current.scale.copy(smoothedScale);

    if (!active) {
      setBubbleTime(bubbleTime + delta);
      circleRef.current.position.y = Math.sin(bubbleTime * 0.5 + index);
    }
  });

  return(
    <Circle 
      args={[2,64]}
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
