import { Html } from "@react-three/drei";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";


export default ({ position, wireType }) => {
  const GLOBAL = useContext(GlobalContext);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (GLOBAL.mode === GLOBAL.MODE.Pathway) {
      setActive(true);
    }
    else {
      setActive(false);
    }
  }, [GLOBAL.mode]);

  return (
    <Html fullscreen position={position} zIndexRange={[100, 0]}>
      <div className={active ? "active wire " + wireType : "wire " + wireType}>
        <img src={"/images/wires/" + wireType + "-wire.png"} />
      </div>
    </Html>
  );
};
