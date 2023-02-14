import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/all";

import AnimSlideUpFadeIn from "../Animations/AnimSlideUpFadeIn";
import AnimNumberAccumulator from "../Animations/AnimNumberAccumulator";
import SVGTransportationIllustration from "../SVGs/SVGTransportationIllustration";

gsap.registerPlugin(DrawSVGPlugin);

export default ({ t, isActive }) => {
  const illustrationRef = useRef();
  const timelineRef = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      timelineRef.current = gsap.timeline().to("#mainpipeline", {
        drawSVG: "0% 100%",
        delay: 0.8 + 0.5,
      });
    }, illustrationRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <div id="slide-transportation">
      <div className="illustration">
        <SVGTransportationIllustration ref={illustrationRef} />
      </div>
      <div className="text">
        <div className="bucket bucket1">
          <AnimSlideUpFadeIn isActive={isActive}>
            <h2>
              <AnimNumberAccumulator
                number={400}
                isActive={isActive}
                toFixed={0}
              />
              + {t("slides.transportation.headline1")}
            </h2>
          </AnimSlideUpFadeIn>
          <AnimSlideUpFadeIn isActive={isActive} delay={0.2}>
            <p>{t("slides.transportation.description1")}</p>
          </AnimSlideUpFadeIn>
        </div>
        <div className="bucket bucket2">
          <AnimSlideUpFadeIn isActive={isActive} delay={0.4}>
            <h2>
              <AnimNumberAccumulator
                number={10}
                isActive={isActive}
                toFixed={0}
                delay={0.4}
              />
              {" - "}
              <AnimNumberAccumulator
                number={12}
                isActive={isActive}
                toFixed={0}
                delay={0.6}
              />{" "}
              {t("slides.transportation.headline2")}
            </h2>
          </AnimSlideUpFadeIn>
          <AnimSlideUpFadeIn isActive={isActive} delay={0.6}>
            <p>{t("slides.transportation.description2")}</p>
          </AnimSlideUpFadeIn>
        </div>
        <div className="bucket bucket3">
          <AnimSlideUpFadeIn isActive={isActive} delay={0.8}>
            <h2>
              <AnimNumberAccumulator
                number={14}
                isActive={isActive}
                toFixed={0}
                delay={0.8}
              />
              + {t("slides.transportation.headline3")}
            </h2>
          </AnimSlideUpFadeIn>
          <AnimSlideUpFadeIn isActive={isActive} delay={1}>
            <p>{t("slides.transportation.description3")}</p>
          </AnimSlideUpFadeIn>
        </div>
      </div>
    </div>
  );
};
