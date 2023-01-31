import { CubicBezierLine } from "@react-three/drei";

export default ({sceneLength}) => {
  {[...Array(20)].map((x, i) => {
    return (
      <CubicBezierLine
        start={[-25, 0 + 0.2 * i, -5]}
        end={[sceneLength, 0 + 0.2 * i, -5]}
        midA={[sceneLength/2, -8 + 0.2 * i, -5]}
        midB={[sceneLength/2, 8 + 0.2 * i, -5]}
        color="#00EEFA"
        lineWidth={1}
        segments={100}
        key={`line-${i}`}
      />
    );
  })}
}