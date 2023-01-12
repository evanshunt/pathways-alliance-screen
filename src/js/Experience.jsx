import React, { useRef, useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import { extend } from "@react-three/fiber";
import {
  Lightformer,
  Environment,
  MeshReflectorMaterial,
  Text,
  Html,
  Effects,
  MapControls,
  Circle,
} from "@react-three/drei";
import { UnrealBloomPass } from "three-stdlib";

import Autopilot from "./Autopilot";

extend({ UnrealBloomPass });

const Experience = () => {
  const textRef = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // gsap.to(textRef.current.position, { x: 2, duration: 10 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Autopilot interval={2} />
      <Effects disableGamma>
        <unrealBloomPass threshold={0.5} strength={0.6} radius={1} />
      </Effects>

      <MapControls enableRotate={false} enableZoom={false} />
      <Environment background>
        <Lightformer position-z={7} scale={8} color="white" form="ring" />
      </Environment>

      <Text
        ref={textRef}
        position={[-0.75, 2.5, 0]}
        textAlign="center"
        maxWidth={10}
        letterSpacing={-0.08}
        lineHeight={0.8}
      >
        There is no single path to net zero.
        <meshStandardMaterial
          color="grey"
          envMapIntensity={12}
          metalness={0.5}
          roughness={0.2}
        />
      </Text>

      <Circle scale={[0.5, 0.5, 0.5]} position={[-5, 1, 0]}>
        <meshStandardMaterial color="hotpink" />
      </Circle>
      <Circle scale={[0.5, 0.5, 0.5]} position={[-3, 1, 0]}>
        <meshStandardMaterial color="hotpink" />
      </Circle>
      <Circle scale={[0.5, 0.5, 0.5]} position={[-1, 1, 0]}>
        <meshStandardMaterial color="hotpink" />
      </Circle>
      <Circle scale={[0.5, 0.5, 0.5]} position={[1, 1, 0]}>
        <meshStandardMaterial color="hotpink" />
      </Circle>
      <Circle scale={[0.5, 0.5, 0.5]} position={[3, 1, 0]}>
        <meshStandardMaterial color="hotpink" />
      </Circle>
      <Circle scale={[0.5, 0.5, 0.5]} position={[5, 1, 0]}>
        <meshStandardMaterial color="hotpink" />
      </Circle>

      {/* Busted with GUI tools changing values https://github.com/pmndrs/drei/issues/1209 */}
      <mesh position={[0, -0.5, 5]} rotation-x={-Math.PI * 0.5}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          resolution={2048}
          blur={[500, 500]}
          mixBlur={2}
          mirror={1}
          mixStrength={8}
          minDepthThreshold={2}
          maxDepthThreshold={2}
          roughness={1}
          depthScale={0.05}
          metalness={0}
        />
      </mesh>
    </>
  );
};

export default Experience;
