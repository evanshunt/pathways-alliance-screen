import { forwardRef, useState, useLayoutEffect, useRef, useImperativeHandle } from 'react';
import { useFrame } from "@react-three/fiber";
import { Circle, Html } from "@react-three/drei";
import * as THREE from 'three';
import DetailViewCollaboration from './DetailViewCollaboration';

export default forwardRef(function({index, position, texture, active=false, setMoveToIndex, open=false, setOpenItemIndex}, ref) {
  const bubbleRef = useRef();
  useImperativeHandle(ref, () => bubbleRef.current);
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
    bubbleRef.current.children[0].scale.copy(smoothedScale);

    if (!active) {
      setBubbleTime(bubbleTime + delta);
      bubbleRef.current.position.y = Math.sin(bubbleTime * 0.5 + index);
    }
  });

  return(
    <group ref={bubbleRef} position={position} >
      <Circle args={[2,64]} onPointerUp={pointerDown}>
        <meshStandardMaterial
          map={texture}
          transparent={true}
          opacity={active ? "1" : "0.6"}
        />
      </Circle>
      <Html
        className={active ? "bubbletext active" : "bubbletext inactive"}
        position={index % 2 === 0 ? [3,-1,0] : [3,3,0]}
      >
        <h2>Uniting an industry</h2>
        <h3>What happens when competitors collaborate?</h3>
      </Html>
      { open && <DetailViewCollaboration />}
    </group>
  );
});
