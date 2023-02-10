import { useRef, useEffect } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { MeshLine, MeshLineMaterial } from "three.meshline";
import { useControls } from "leva";

extend({ MeshLine, MeshLineMaterial });

// TODO: Add Leva controls
const Waves = ({ maxSceneLength }) => {
  const meshlinesRef = useRef([]);

  const [{ numWaves, amplitude, frequency, numPoints, xLength, xOffset, xOffsetMultiplier, yOffset, yOffsetMultiplier, zOffset }, set] =
  useControls("Waves", () => ({
    numWaves: 20,
    amplitude: 3.5,
    frequency: 4.5,
    numPoints: 0,
    xLength: 0,
    xOffset: 0,
    xOffsetMultiplier: 0.6,
    yOffset: 0,
    yOffsetMultiplier: 0.13,
    zOffset: -10
  }));

  useEffect(() => {
    set({
      numPoints: maxSceneLength * 1.65,
      xLength: maxSceneLength * 2.5,
      xOffset: -maxSceneLength,
    });
  }, [maxSceneLength]);

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

  const meshLineMaterial = (
    <meshLineMaterial
      attach="material"
      lineWidth={0.02}
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
