import { useRef } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { MeshLine, MeshLineMaterial } from "three.meshline";

extend({ MeshLine, MeshLineMaterial });

// TODO: Add Leva controls
const Waves = ({sceneLength}) => {
  const meshlinesRef = useRef([]);
  const numWaves = 20;
  const amplitude = 3;
  const frequency = 4;
  const numPoints = 200;
  const xLength = sceneLength*2.5;
  const xOffset = -sceneLength;
  const xOffsetMultiplier = 0.5;
  const yOffset = 0;
  const yOffsetMultiplier = 0.1;

  useFrame((state, delta) => {
    [...Array(numWaves)].map((el, i) => {
      const points = [];
      for (let point = 1; point < numPoints; point += 1) {
        points.push(
          (point / numPoints) * xLength + xOffset + i * xOffsetMultiplier,
          amplitude * Math.sin(point / frequency + state.clock.elapsedTime * 0.2) +
            +i * yOffsetMultiplier + yOffset,
          -4
        );
      }

      if (meshlinesRef.current[i]) {
        meshlinesRef.current[i].setPoints(points);
      }
    });
  });

  return [...Array(numWaves)].map((el, i) => {
    return (
      <mesh key={`waveline-${i}`}>
        <meshLine
          attach="geometry"
          ref={(el) => {
            meshlinesRef.current[i] = el;
          }}
        />
        <meshLineMaterial
          attach="material"
          lineWidth={0.03}
          color={[0, 238, 250]} // #00eefa
        />
      </mesh>
    );
  });
};

export default Waves;
