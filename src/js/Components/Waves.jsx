import { useRef } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { MeshLine, MeshLineMaterial } from "three.meshline";

extend({ MeshLine, MeshLineMaterial });

// TODO: Add Leva controls
const Waves = ({ maxSceneLength }) => {
  const meshlinesRef = useRef([]);
  const numWaves = 20;
  const amplitude = 3.5;
  const frequency = 4.5;
  const numPoints = maxSceneLength * 1.65;
  const xLength = maxSceneLength * 2.5;
  const xOffset = -maxSceneLength;
  const xOffsetMultiplier = 0.6;
  const yOffset = 0;
  const yOffsetMultiplier = 0.13;
  const zOffset = -10;

  useFrame((state, delta) => {
    [...Array(numWaves)].map((el, i) => {
      const points = [];
      for (let point = 1; point < numPoints; point += 1) {
        points.push(
          (point / numPoints) * xLength + xOffset + i * xOffsetMultiplier,
          amplitude *
            Math.sin(point / frequency + state.clock.elapsedTime * 0.2) +
            +i * yOffsetMultiplier +
            yOffset,
          zOffset
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
          lineWidth={0.02}
          color={[0, 238, 250]} // #00eefa
        />
      </mesh>
    );
  });
};

export default Waves;
