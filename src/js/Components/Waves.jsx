import { useRef, useEffect } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { MeshLine, MeshLineMaterial } from "three.meshline";
import { useControls } from "leva";

extend({ MeshLine, MeshLineMaterial });

const Waves = ({ maxSceneLength }) => {
  const meshlinesRef = useRef([]);

  const [
    {
      lineWidth,
      opacity,
      numWaves,
      amplitude,
      frequency,
      numPoints,
      animationSpeed,
      lineOffset,
      pointOffset,
      xOffsetMultiplier,
      yOffset,
      yOffsetMultiplier,
      zOffset,
    },
    set,
  ] = useControls("Waves", () => ({
    lineWidth: { value: 0.02, min: 0.01, max: 0.1, step: 0.01 },
    opacity: { value: 1, min: 0, max: 1, step: 0.01 },
    numWaves: { value: 20, min: 1, max: 40, step: 1 },
    amplitude: { value: 3.5, min: 0, max: 10, step: 0.1 },
    frequency: { value: 4.5, min: 0, max: 10, step: 0.1 },
    numPoints: { value: 215, min: 10, max: 400, step: 1 },
    animationSpeed: { value: 0.2, min: 0, max: 1, step: 0.01 },
    lineOffset: { value: 0.05, min: -0.3, max: 0.3, step: 0.01 },
    pointOffset: { value: 0.05, min: -0.3, max: 0.3, step: 0.01 },
    xOffsetMultiplier: { value: 0.6, min: 0, max: 2, step: 0.01 },
    yOffset: { value: 0, min: -20, max: 20, step: 0.1 },
    yOffsetMultiplier:  { value: 0.13, min: 0, max: 1, step: 0.01 },
    zOffset: { value: -10, min: -30, max: 9.9, step: 0.1 }
  }));

  useFrame((state, delta) => {
    [...Array(numWaves)].map((el, i) => {
      const points = [];
      for (let point = 1; point < numPoints; point += 1) {
        points.push(
          (point / numPoints) * (maxSceneLength * 2.5) + -maxSceneLength + i * xOffsetMultiplier,
          amplitude * Math.sin(state.clock.elapsedTime * animationSpeed + i * lineOffset + point * pointOffset) *
            Math.sin(point / frequency) +
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

  const meshLineMaterial = (
    <meshLineMaterial
      attach="material"
      lineWidth={lineWidth}
      transparent={true}
      opacity={opacity}
      color={[0, 238, 250]} // #00eefa
    />
  );

  return [...Array(numWaves)].map((el, i) => {
    return (
      <mesh key={`waveline-${i}`}>
        <meshLine
          attach="geometry"
          ref={(el) => {
            meshlinesRef.current[i] = el;
          }}
        />
        {meshLineMaterial}
      </mesh>
    );
  });
};

export default Waves;
