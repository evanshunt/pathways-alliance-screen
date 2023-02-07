import {
  forwardRef,
  useState,
  useRef,
  useImperativeHandle,
} from "react";
import { useFrame } from "@react-three/fiber";
import { Circle, Html } from "@react-three/drei";
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

  useFrame((state, delta) => {
    if (!active) {
      setBubbleTime(bubbleTime + delta);
      bubbleRef.current.position.y += Math.sin(bubbleTime * 0.5) * 0.003;
    }
  });

  return (
    <group ref={bubbleRef} position={position}>
      <Circle args={[4, 64]} onPointerUp={pointerDown}>
        <meshStandardMaterial visible={false} />
      </Circle>
      <Html
        zIndexRange={[300, 200]}
        className={active ? "bubble active" : "bubble inactive"}
      >
        <button id={view} />
        <div className={index % 2 ? "bubbletext up" : "bubbletext down"}>
          <h2>{t("bubbles." + view + ".headline")}</h2>
          <h3>{t("bubbles." + view + ".subhead")}</h3>
          <button />
        </div>
      </Html>
    </group>
  );
});
