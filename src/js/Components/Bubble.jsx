import {
  forwardRef,
  useState,
  useLayoutEffect,
  useRef,
  useImperativeHandle,
} from "react";
import { useFrame } from "@react-three/fiber";
import { Circle, Html } from "@react-three/drei";
import * as THREE from "three";
import { useTranslation } from "react-i18next";

export default forwardRef(function (
  {
    index,
    position,
    view,
    texture,
    active = false,
    onActive,
    setMoveToIndex,
    open = false,
    setOpenItemIndex,
  },
  ref
) {
  const bubbleRef = useRef();
  useImperativeHandle(ref, () => bubbleRef.current);
  const [scale] = useState(() => new THREE.Vector3());
  const [smoothedScale] = useState(() => new THREE.Vector3());
  const [bubbleTime, setBubbleTime] = useState(0);
  const { t } = useTranslation("common");

  const pointerDown = (event) => {
    if (active) {
      setOpenItemIndex(index);
      onActive();
    } else if (!open) {
      setMoveToIndex(index);
    }
  };

  useLayoutEffect(() => {
    if (active) {
      scale.copy(new THREE.Vector3(2, 2, 2));
    } else {
      scale.copy(new THREE.Vector3(1, 1, 1));
    }
  }, [active]);

  useFrame((state, delta) => {
    smoothedScale.lerp(scale, 0.1);
    bubbleRef.current.children[0].scale.copy(smoothedScale);

    if (!active) {
      setBubbleTime(bubbleTime + delta);
      bubbleRef.current.position.y += Math.sin(bubbleTime * 0.5) * 0.005;
    }
  });

  return (
    <group ref={bubbleRef} position={position}>
      <Circle args={[2, 64]} onPointerUp={pointerDown}>
        <meshStandardMaterial
          map={texture}
          // transparent
          // opacity={active ? "1" : "0.9"}
        />
      </Circle>
      <Html
        zIndexRange={[100, 0]}
        className={active ? "bubbletext active" : "bubbletext inactive"}
        position={index % 2 === 0 ? [3, -1, 0] : [3, 3, 0]}
      >
        <h2>{t("bubbles." + view + ".headline")}</h2>
        <h3>{t("bubbles." + view + ".subhead")}</h3>
      </Html>
    </group>
  );
});
