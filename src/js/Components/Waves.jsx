import { useRef } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { MeshLine, MeshLineMaterial } from "three.meshline";

extend({ MeshLine, MeshLineMaterial });

// TODO: Add Leva controls
const Waves = () => {
  const meshlinesRef = useRef([]);
  const time = useRef(0);
  const numWaves = 20;
  const amplitude = 4;
  const frequency = 8;
  const numPoints = 200;
  const xLength = 220;
  const xOffset = -30;
  const xOffsetMultiplier = 0.4;
  const yOffset = 0;
  const yOffsetMultiplier = 0.1;

  useFrame((state, delta) => {
    time.current += delta;

    [...Array(numWaves)].map((el, i) => {
      const points = [];
      for (let point = 1; point < numPoints; point += 1) {
        points.push(
          (point / numPoints) * xLength + xOffset + i * xOffsetMultiplier,
          amplitude * Math.sin(point / frequency + yOffset + time.current) +
            +i * yOffsetMultiplier,
          -1
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
          transparent
        />
      </mesh>
    );
  });
};

export default Waves;
