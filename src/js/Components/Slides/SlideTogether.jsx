import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/all";

import AnimNumberAccumulator from "../Animations/AnimNumberAccumulator";
import AnimSlideUpFadeIn from "../Animations/AnimSlideUpFadeIn";

gsap.registerPlugin(DrawSVGPlugin);

export default ({ t, isActive }) => {
  const circleRef = useRef();
  const timelineRef = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(circleRef.current, {
        drawSVG: 0,
        rotation: -90,
        transformOrigin: "center center",
      });

      timelineRef.current = gsap.timeline().to(circleRef.current, {
        drawSVG: "0% 100%",
        delay: 0.8 + 0.5,
        duration: 1,
      });
    }, circleRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (isActive) {
      timelineRef.current.play(0);
    }
  }, [isActive]);

  return (
    <div id="slide-together">
      <div className="highlight">
        <div className="background">
          <svg width="550" height="550" preserveAspectRatio="xMidYMid meet">
            <mask id="svg-mask">
              <circle
                stroke="#ffffff"
                cx="275"
                cy="275"
                r="125"
                ref={circleRef}
              ></circle>
            </mask>
            <image
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xlinkHref="/images/slides/together-highlight-bg.png"
              mask="url(#svg-mask)"
              x="0"
              y="0"
              width="100%"
              height="100%"
            ></image>
          </svg>
        </div>
        <AnimSlideUpFadeIn isActive={isActive}>
          <div className="heading">
            <h1>
              <span className="text">
                {t("slides.together.highlightBeforeNumberText")}
              </span>
              <span className="number">
                <AnimNumberAccumulator
                  number={95}
                  isActive={isActive}
                  toFixed={0}
                  delay={0.5}
                />
                %
              </span>{" "}
              <span className="text">
                {t("slides.together.highlightAfterNumberText")}
              </span>
            </h1>
          </div>
        </AnimSlideUpFadeIn>
      </div>
      <div className="stats">
        <div className="bucket">
          <AnimSlideUpFadeIn isActive={isActive} delay={0.5}>
            <h2>
              $
              <AnimNumberAccumulator
                number={16.5}
                isActive={isActive}
                toFixed={1}
                delay={0.7}
              />{" "}
              {t("slides.together.bucket1Heading")}
            </h2>
          </AnimSlideUpFadeIn>
          <AnimSlideUpFadeIn isActive={isActive} delay={0.7}>
            <p>{t("slides.together.bucket1Text")}</p>
          </AnimSlideUpFadeIn>
        </div>

        <div className="bucket">
          <AnimSlideUpFadeIn isActive={isActive} delay={0.9}>
            <h2>
              $
              <AnimNumberAccumulator
                number={7.6}
                isActive={isActive}
                toFixed={1}
                delay={1.1}
              />{" "}
              {t("slides.together.bucket2Heading")}
            </h2>
          </AnimSlideUpFadeIn>
          <AnimSlideUpFadeIn isActive={isActive} delay={1.1}>
            <p>{t("slides.together.bucket2Text")}</p>
          </AnimSlideUpFadeIn>
        </div>
        <div className="bucket reverse">
          <AnimSlideUpFadeIn isActive={isActive} delay={1.3}>
            <h2>
              <AnimNumberAccumulator
                number={35000}
                isActive={isActive}
                toFixed={0}
                delay={1.5}
              />{" "}
              {t("slides.together.bucket3Heading")}
            </h2>
          </AnimSlideUpFadeIn>
          <AnimSlideUpFadeIn isActive={isActive} delay={1.5}>
            <p>{t("slides.together.bucket3Text")}</p>
          </AnimSlideUpFadeIn>
        </div>
      </div>
    </div>
  );
};
