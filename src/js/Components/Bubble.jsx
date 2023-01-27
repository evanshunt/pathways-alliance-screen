import { forwardRef, useState, useLayoutEffect, useRef, useImperativeHandle } from 'react';
import { useFrame } from "@react-three/fiber";
import { Circle } from "@react-three/drei";
import * as THREE from 'three';
import gsap from "gsap";
import DetailViewCollaboration from './DetailViewCollaboration';

export default forwardRef(function({index, position, onPointerDown, active=false, setActiveItemIndex}, ref) {
  const circleRef = useRef();
  useImperativeHandle(ref, () => circleRef.current);
  const [scale] = useState(() => new THREE.Vector3(1, 1, 1));
  const [smoothedScale] = useState(() => new THREE.Vector3(1, 1, 1));
  const [openDetail, setOpenDetail] = useState(false);

  const pointerDown = (event) => {
    if (active) {
      setOpenDetail(true);
    }
    else {
      setActiveItemIndex(index);
    }
  }

  useLayoutEffect(() => {
    gsap.to(
      circleRef.current.position,
      {
        y: 1,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        duration: 7,
      },
      index * 2
    );
  });

  useLayoutEffect(() => {
    if (active) {
      scale.copy(new THREE.Vector3(2, 2, 2));
    }
    else {
      scale.copy(new THREE.Vector3(1, 1, 1));
      setOpenDetail(false);
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
      onPointerDown={pointerDown}
    >
      <meshStandardMaterial
        color={active ? "green" : "hotpink"}
      />
      { openDetail && <DetailViewCollaboration />}
    </Circle>
  );
});