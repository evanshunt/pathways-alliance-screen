import { forwardRef, useRef, useImperativeHandle } from "react";
import { useFrame } from "@react-three/fiber";
import { Circle, Html } from "@react-three/drei";
import { useTranslation } from "react-i18next";

export default forwardRef(function (
  {
    index,
    position,
    view,
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
  const bubbleTime = useRef(0);
  const { t } = useTranslation("common");

  const handlePointerUp = (event) => {
    if (active) {
      setOpenItemIndex(index);
      onActive();
    } else if (!open) {
      setMoveToIndex(index);
    }
  };

  useFrame((state, delta) => {
    if (!active) {
      bubbleTime.current += delta;
      bubbleRef.current.position.y +=
        Math.sin(bubbleTime.current * 0.5) * 0.003;
    }
  });

  return (
    <group ref={bubbleRef} position={position}>
      <Circle args={[4, 64]} onPointerUp={handlePointerUp}>
        <meshStandardMaterial visible={false} />
      </Circle>
      {/* I don't love the manual positioning here for this button hot
      spot. It lines up with the HTML button well enough to be suitable, 
      but it has to be made bigger to encompass the range of flexible
      button positions based off the text content of the HTML. There's
      probably a better way to do it, but attaching the pointer event to
      the HTML button itself doesn't work because the drag control can
      no longer stop its activation. Turn on visibility to see how
      crummy this is. In real life usage though it should be decent. */}
      <Circle args={[2.2, 64]} position={index % 2 ? [13.8,1.6,0] : [13.8,-1.3,0]} onPointerUp={active && handlePointerUp}>
        <meshStandardMaterial visible={false} />
      </Circle>
      <Html
        zIndexRange={[300, 200]}
        className={active ? "bubble active" : "bubble inactive"}
      >
        <button id={view} />
        <div className={index % 2 ? "bubbletext up" : "bubbletext down"}>
          <div className="text">
            <div>
              <h2>{t("bubbles." + view + ".headline")}</h2>
              <p>{t("bubbles." + view + ".subhead")}</p>
            </div>
            <button className="highlight">
              <div className="plus"></div>
            </button>
          </div>
        </div>
      </Html>
    </group>
  );
});
