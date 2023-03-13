import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import AnimSlideUpFadeIn from "../Animations/AnimSlideUpFadeIn";
import SVGCapturingIllustration from "../SVGs/SVGCapturingIllustration";

export default ({ t }) => {
  const illustrationRef = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const delayOffset = 2;
      const mainTimeline = gsap.timeline({
        delay: delayOffset,
        repeat: -1,
        repeatDelay: 30,
      });

      const structures = [
        { id: "#amine-tank1-2" },
        { id: "#amine-tank1" },
        { id: "#compression-tank2" },
        { id: "#compressor" },
        { id: ".illustration .legend" },
      ];
      structures.map((structure) => {
        mainTimeline.from(structure.id, {
          autoAlpha: 0,
          y: "-=10",
          duration: 0.2,
        });
      });

      const pipes = [
        { id: "#intake1 path", drawSVG: "-100%" },
        { id: "#feed_into_compressor path", drawSVG: "100%" },
        { id: "#feed_into_compressor circle", drawSVG: "100%" },
        { id: "#amine_return path", drawSVG: "100%" },
        { id: "#amine_return circle", drawSVG: "100%" },
        { id: "#pipe_into_compressor", drawSVG: "100%" },
        { id: "#collection_pipe line", drawSVG: "100%" },
        { id: "#collection_pipe polyline", drawSVG: "100%" },
      ];
      pipes.map((pipe) => {
        gsap.set(pipe.id, { drawSVG: 0 });
        mainTimeline.to(pipe.id, {
          drawSVG: pipe.drawSVG,
          duration: pipe.duration ? pipe.duration : 0.2,
        });
      });

      const gases = [
        { id: "#Emissions", delay: 0 },
        { id: ".tooltip-amine", delay: 0 },
        { id: "#Amine", delay: 2.5 },
        { id: ".tooltip-heat", delay: 0 },
        { id: "#CO2", delay: 2.5 },
        { id: ".tooltip-pressure", delay: 0 },
      ];
      gases.map((gas) => {
        mainTimeline.from(gas.id, {
          autoAlpha: 0,
          y: "-=10",
          duration: 0.25,
          delay: gas.delay,
        });
      });

      const arrows = [
        { id: "#arrow_5 path", drawSVG: "-100%" },
        { id: "#arrow_5 polyline", drawSVG: "-100%" },
        { id: "#arrow_6 path", drawSVG: "-100%" },
        { id: "#arrow_6 polyline", drawSVG: "-100%" },
        { id: "#arrow_7 line", drawSVG: "100%" },
        { id: "#arrow_7 polyline", drawSVG: "100%" },
      ];
      arrows.map((arrow) => {
        gsap.set(arrow.id, { drawSVG: 0 });
        mainTimeline.to(arrow.id, {
          drawSVG: arrow.drawSVG,
          duration: arrow.duration ? arrow.duration : 0.3,
          delay: arrow.delay ? arrow.delay : 0,
        });
      });

      gsap.set("#collection_pipe_fluid", { drawSVG: 0 });
      mainTimeline.to("#collection_pipe_fluid", {
        drawSVG: "100%",
        duration: 0.3,
      });
    }, illustrationRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <div id="detail-capturing">
      <div className="text">
        <AnimSlideUpFadeIn>
          <h2>{t("details.capturing.heading")}</h2>
        </AnimSlideUpFadeIn>
        <AnimSlideUpFadeIn delay={0.2}>
          <div className="paragraph-wrapper">
            {t("details.capturing.text")
              .split("\n")
              .map((paragraph, i) => (
                <p key={`detail-capturing-paragraph-${i}`}>{paragraph}</p>
              ))}
            <p>
              <em>*{t("details.capturing.disclaimer")}</em>
            </p>
          </div>
        </AnimSlideUpFadeIn>
      </div>
      <div className="illustration" ref={illustrationRef}>
        <SVGCapturingIllustration />
        <div className="tooltips">
          <div className="tooltip tooltip-amine tip-top-right">
            {t("details.capturing.tooltips.amine")
              .split("\n")
              .map((paragraph, i) => (
                <p key={`detail-capturing-amine-paragraph-${i}`}>{paragraph}</p>
              ))}
          </div>
          <div className="tooltip tooltip-heat alt-rounded tip-left-top">
            {t("details.capturing.tooltips.heat")
              .split("\n")
              .map((paragraph, i) => (
                <p key={`detail-capturing-heat-paragraph-${i}`}>{paragraph}</p>
              ))}
          </div>
          <div className="tooltip tooltip-pressure tip-bottom-left">
            {t("details.capturing.tooltips.pressure")
              .split("\n")
              .map((paragraph, i) => (
                <p key={`detail-capturing-pressure-paragraph-${i}`}>
                  {paragraph}
                </p>
              ))}
          </div>
        </div>
        <div className="legend">
          <div className="emissions">
            {t("details.capturing.legend.emissions")}
          </div>
          <div className="amine">{t("details.capturing.legend.amine")}</div>
          <div className="co2">{t("details.capturing.legend.co2")}</div>
        </div>
      </div>
    </div>
  );
};
