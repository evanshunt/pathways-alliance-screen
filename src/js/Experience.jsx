import { useThree, extend, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Text, Html, Effects } from '@react-three/drei'
import { UnrealBloomPass } from 'three-stdlib'

extend({ UnrealBloomPass });

export default function Experience() {
  const textRef = useRef();

  useFrame((state, delta) => {
    textRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.04;
    textRef.current.rotation.y = Math.cos(state.clock.elapsedTime) * 0.04;
  });

  return <>
    <ambientLight intensity={ 0.03 }/>

    <Effects disableGamma>
      <unrealBloomPass threshold={0.5} strength={0.5} radius={1} />
    </Effects>
    
    <pointLight position={[0,0,40]} intensity={0.5} />

    <group ref={textRef}>
      <Text fontSize={0.5} position={[0,0.25,0]}>
        There is no single path to
        <meshStandardMaterial />
      </Text>
      <Text fontSize={0.5} position={[0,-0.25,0]}>
        net zero.
        <meshStandardMaterial />
      </Text>
    </group>
  </>
}
