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
      timelineRef.current = gsap.timeline();

      const buildings = [
        "#Fort_Mac_facility",
        "#carbon-capture-facility1",
        "#carbon-capture-facility2",
        "#carbon-capture-facility3",
        "#carbon-capture-facility4",
        "#carbon-capture-facility5",
        "#carbon-capture-facility6",
        "#carbon-capture-facility7",
        "#carbon-capture-facility8",
        "#carbon-capture-facility9",
        "#map-industrial-building1",
        "#map-industrial-building2",
        "#map-industrial-building3",
        "#carbon-capture-facility10",
        "#carbon-capture-facility11",
        "#carbon-capture-facility12",
        "#carbon-capture-facility13",
        "#carbon-capture-facility14",
        "#carbon-capture-facility15",
        "#carbon-capture-facility16",
        "#carbon-capture-facility17",
        "#cold_lake",
      ];

      buildings.map((building) => {
        timelineRef.current.from(building, {
          autoAlpha: 0,
          y: "-=5",
          stagger: 0.001,
          duration: 0.1,
        });
      });

      const pipes = [
        { id: "#map-connectpipe1", drawSVG: "-100%" },
        { id: "#map-connectpipe2", drawSVG: "-100%" },
        { id: "#map-connectpipe3", drawSVG: "-100%" },
        { id: "#map-connectpipe4", drawSVG: "100%" },
        { id: "#map-connectpipe5", drawSVG: "-100%" },
        { id: "#map-connectpipe6", drawSVG: "-100%" },
        { id: "#map-connectpipe7a", drawSVG: "100%" },
        { id: "#map-connectpipe7", drawSVG: "100%" },
        { id: "#map-connectpipe8", drawSVG: "100%" },
        { id: "#map-connectpipe9", drawSVG: "100%" },
        { id: "#map-connectpipe10", drawSVG: "-100%" },
        { id: "#map-connectpipe11", drawSVG: "100%" },
        { id: "#map-connectpipe12", drawSVG: "-100%" },
        { id: "#map-connectpipe13", drawSVG: "-100%" },
        { id: "#map-connectpipe14", drawSVG: "100%" },
        { id: "#map-connectpipe15", drawSVG: "100%" },
        { id: "#map-connectpipe16", drawSVG: "-100%" },
      ];

      pipes.map((pipe) => {
        gsap.set(pipe.id, { drawSVG: 0 });
        timelineRef.current.to(pipe.id, {
          drawSVG: pipe.drawSVG,
          stagger: 0.001,
          duration: 0.1,
        });
      });
    }, illustrationRef.current);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (isActive) {
      timelineRef.current.play(0);
    }
  }, [isActive]);

  return (
    <div id="slide-transportation">
      <div className="illustration">
        <SVGTransportationIllustration ref={illustrationRef} />
      </div>
      <div className="text">
        <div className="bucket bucket1">
          <AnimSlideUpFadeIn isActive={isActive} delay={0.4}>
            <h2>
              <AnimNumberAccumulator
                number={400}
                isActive={isActive}
                toFixed={0}
              />
              + {t("slides.transportation.headline1")}
            </h2>
          </AnimSlideUpFadeIn>
          <AnimSlideUpFadeIn isActive={isActive} delay={0.6}>
            <p>{t("slides.transportation.description1")}</p>
          </AnimSlideUpFadeIn>
        </div>
        <div className="bucket bucket2">
          <AnimSlideUpFadeIn isActive={isActive} delay={0.8}>
            <h2>
              <AnimNumberAccumulator
                number={10}
                isActive={isActive}
                toFixed={0}
                delay={1}
              />
              {" - "}
              <AnimNumberAccumulator
                number={12}
                isActive={isActive}
                toFixed={0}
                delay={1.2}
              />{" "}
              {t("slides.transportation.headline2")}
            </h2>
          </AnimSlideUpFadeIn>
          <AnimSlideUpFadeIn isActive={isActive} delay={1.4}>
            <p>{t("slides.transportation.description2")}</p>
          </AnimSlideUpFadeIn>
        </div>
        <div className="bucket bucket3">
          <AnimSlideUpFadeIn isActive={isActive} delay={1.6}>
            <h2>
              <AnimNumberAccumulator
                number={14}
                isActive={isActive}
                toFixed={0}
                delay={1.8}
              />
              + {t("slides.transportation.headline3")}
            </h2>
          </AnimSlideUpFadeIn>
          <AnimSlideUpFadeIn isActive={isActive} delay={2}>
            <p>{t("slides.transportation.description3")}</p>
          </AnimSlideUpFadeIn>
        </div>
      </div>
    </div>
  );
};
