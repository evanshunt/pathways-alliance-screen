import { Html } from "@react-three/drei";

export default ({openItemIndex, setOpenItemIndex}) => {
  return (
    <Html
      fullscreen
    >
      <button id="home" disabled={isNaN(openItemIndex) ? true : false}
        onPointerDown={() => {
          setOpenItemIndex();
        }}
      >
        <span>
          <svg width="100" height="25" viewBox="0 0 100 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.8333 43.6667L2 22.8333L22.8333 2" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 22.834H97.8333" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        <span>Home</span>
      </button>
    </Html>
  );
};
