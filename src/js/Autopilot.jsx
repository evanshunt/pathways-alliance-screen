import { Text } from "@react-three/drei";

export default function Autopilot() {
  return (
    <Text
      position={[-0.75, 0.75, 0]}
      textAlign="center"
      maxWidth={10}
      letterSpacing={-0.08}
      lineHeight={0.8}
    >
      Autopilot active
      <meshStandardMaterial />
    </Text>
  );
}
