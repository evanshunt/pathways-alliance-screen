import { useRef, useContext } from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import { GlobalContext } from "../Context/GlobalContext";

export default ({ active }) => {
  const GLOBAL = useContext(GlobalContext);
  const controlRef = useRef();

  useFrame((state, delta) => {
    if (active) {
      controlRef.current.position.x = GLOBAL.cameraPositionLerped.x;
      controlRef.current.position.y = GLOBAL.cameraPositionLerped.y;
    }
  });

  return (
    <group ref={controlRef} position={[0, -20, 0]}>
      <Html fullscreen zIndexRange={[100, 0]}>
        <section
          className={active ? "detailview active" : "detailview inactive"}
        >
          <div className="content">
            <div className="text">
              <h2>Climate change is a critical challenge</h2>
              <p>
                Canada's oil sands have a shared goal: net-zero by 2050. But no
                company can get there alone.
              </p>
              <p>
                Pathways Alliance is a team-up of Canada's six largest oil sands
                producers. Our companies make up 95% of Canada's oil sands
                industry. Together, we can go farther, faster.
              </p>
              <p>
                We're also working with provincial and federal governments to
                help Canada meet its Paris Climate Agreement goals. By 2030, our
                plan could reduce absolute CO2 emissions from oil sands by 22
                million tonnes per year.
              </p>
            </div>
            <div className="illustration">
              <ul className="logos">
                <li>
                  <img src="/images/logos/canadian-natural.png" />
                </li>
                <li>
                  <img src="/images/logos/cenovus.png" />
                </li>
                <li>
                  <img src="/images/logos/conoco-phillips.png" />
                </li>
                <li>
                  <img src="/images/logos/imperial.png" />
                </li>
                <li>
                  <img src="/images/logos/meg.png" />
                </li>
                <li>
                  <img src="/images/logos/suncor.png" />
                </li>
              </ul>
            </div>
          </div>
        </section>
      </Html>
    </group>
  );
};
