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
        "#map-industrial-building1",
        "#map-industrial-building2",
        "#map-industrial-building3",
        "#map-industrial-building4",
        "#map-industrial-building5",
        "#map-industrial-building6",
        "#map-industrial-building7",
        "#map-industrial-building8",
        "#map-industrial-building9",
        "#map-industrial-building10",
        "#map-industrial-building11",
        "#map-industrial-building12",
        "#map-industrial-building13",
        "#map-industrial-building14",
        "#map-industrial-building15",
        "#map-industrial-building16",
        "#map-industrial-building17",
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
        { id: "#main_pipline", drawSVG: "100%", duration: 2 },
        { id: "#map-connectpipe1", drawSVG: "100%" },
        { id: "#map-connectpipe2", drawSVG: "-100%" },
        { id: "#map-connectpipe3", drawSVG: "-100%" },
        { id: "#map-connectpipe4", drawSVG: "100%" },
        { id: "#map-connectpipe5", drawSVG: "-100%" },
        { id: "#map-connectpipe6", drawSVG: "100%" },
        { id: "#map-connectpipe7", drawSVG: "-100%" },
        { id: "#map-connectpipe8", drawSVG: "100%" },
        { id: "#map-connectpipe9", drawSVG: "-100%" },
        { id: "#map-connectpipe10", drawSVG: "100%" },
        { id: "#map-connectpipe11a", drawSVG: "-100%" },
        { id: "#map-connectpipe12a", drawSVG: "100%" },
        { id: "#map-connectpipe13", drawSVG: "-100%" },
        { id: "#map-connectpipe14", drawSVG: "100%" },
        { id: "#map-connectpipe15", drawSVG: "-100%" },
        { id: "#map-connectpipe16", drawSVG: "100%" },
        { id: "#map-connectpipe17", drawSVG: "-100%" },
      ];

      pipes.map((pipe) => {
        gsap.set(pipe.id, { drawSVG: 0 });
        timelineRef.current.to(pipe.id, {
          drawSVG: pipe.drawSVG,
          stagger: 0.05,
          duration: pipe.duration ? pipe.duration : 0.1,
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
          <AnimSlideUpFadeIn isActive={isActive} delay={1}>
            <h2>
              <AnimNumberAccumulator
                number={400}
                isActive={isActive}
                toFixed={0}
              />
              + {t("slides.transportation.headline1")}
            </h2>
          </AnimSlideUpFadeIn>
          <AnimSlideUpFadeIn isActive={isActive} delay={1.2}>
            <p>{t("slides.transportation.description1")}</p>
          </AnimSlideUpFadeIn>
        </div>
        <div className="bucket bucket2">
          <AnimSlideUpFadeIn isActive={isActive} delay={2}>
            <h2>
              <AnimNumberAccumulator
                number={10}
                isActive={isActive}
                toFixed={0}
                delay={2.2}
              />
              {" - "}
              <AnimNumberAccumulator
                number={12}
                isActive={isActive}
                toFixed={0}
                delay={2.4}
              />{" "}
              {t("slides.transportation.headline2")}
            </h2>
          </AnimSlideUpFadeIn>
          <AnimSlideUpFadeIn isActive={isActive} delay={2.6}>
            <p>{t("slides.transportation.description2")}</p>
          </AnimSlideUpFadeIn>
        </div>
        <div className="bucket bucket3">
          <AnimSlideUpFadeIn isActive={isActive} delay={1.4}>
            <h2>
              <AnimNumberAccumulator
                number={14}
                isActive={isActive}
                toFixed={0}
                delay={1.6}
              />
              + {t("slides.transportation.headline3")}
            </h2>
          </AnimSlideUpFadeIn>
          <AnimSlideUpFadeIn isActive={isActive} delay={1.8}>
            <p>{t("slides.transportation.description3")}</p>
          </AnimSlideUpFadeIn>
        </div>
      </div>
    </div>
  );
};
