import gsap from "gsap";
import { useThree, extend, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import {
  Lightformer,
  Environment,
  MeshReflectorMaterial,
  Float,
  Text,
  Html,
  Effects,
  OrbitControls,
} from "@react-three/drei";
import { UnrealBloomPass } from "three-stdlib";
import { Mesh } from "three";
import { useControls } from "leva";
import { Perf } from "r3f-perf";

extend({ UnrealBloomPass });

export default function Experience() {
  const textRef = useRef();

  const { perfVisible } = useControls({
    perfVisible: false,
  });

  const { degreesOfRotation, rotationSpeed } = useControls("Text", {
    degreesOfRotation: {
      value: 6,
      min: 0,
      max: 45,
      step: 1,
    },
    rotationSpeed: {
      value: 0.5,
      min: 0,
      max: 2,
      step: 0.1,
    },
  });

  useFrame((state, delta) => {
    // textRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.04;
    textRef.current.rotation.y =
      Math.cos(state.clock.elapsedTime * rotationSpeed) *
        -degreesOfRotation *
        (Math.PI / 180) -
      (12 * Math.PI) / 180;
  });

  useEffect(() => {
    let ctx = gsap.context(() => {
      console.log(textRef.current.position.x);
      gsap.to(textRef.current.position, { x: 10, duration: 10 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <OrbitControls />
      <Environment background>
        <Lightformer position-z={7} scale={8} color="white" form="ring" />
      </Environment>

      {/* <ambientLight intensity={ 0.03 }/> */}

      <Effects disableGamma>
        <unrealBloomPass threshold={0.5} strength={0.6} radius={1} />
      </Effects>

      {/* <pointLight position={[0,0,40]} intensity={0.5} /> */}

      <Text
        ref={textRef}
        position={[-0.75, 0.75, 0]}
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

      {/* Busted with GUI tools changing values https://github.com/pmndrs/drei/issues/1209 */}
      <mesh position={[0, -0.1, 5]} rotation-x={-Math.PI * 0.5}>
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
}
