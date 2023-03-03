import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import AnimSlideUpFadeIn from "../Animations/AnimSlideUpFadeIn";
import DetailTransportationDetailIllustration from "../SVGs/SVGTransporationDetailIllustration";

export default ({ t }) => {
  const illustrationRef = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const delayOffset = 1.5;
      const mainTimeline = gsap.timeline({
        delay: delayOffset,
        repeat: -1,
        repeatDelay: 30,
      });
      const mapTimeline = gsap.timeline({
        delay: delayOffset,
        repeat: -1,
        repeatDelay: 30,
      });
      const labelTimeline = gsap.timeline({
        delay: delayOffset,
        repeat: -1,
        repeatDelay: 30,
      });

      const buildings = [
        "#Fort_Mac_facility",
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
        "#CCS",
        ".titles .fort-mcmurray",
        ".titles .in-situ",
        ".titles .cold-lake",
      ];

      buildings.map((building) => {
        mainTimeline.from(building, {
          autoAlpha: 0,
          y: "-=5",
          stagger: 0.001,
          duration: 0.1,
        });
      });

      const pipes = [
        { id: "#main_pipline", drawSVG: "100%", duration: 4, delay: 1 },
        { id: "#FILL_PIPE1", drawSVG: "100%" },
        { id: "#FILL_PIPE2", drawSVG: "100%" },
        { id: "#FILL_cl-mpipe3", drawSVG: "100%" },
        { id: "#FILL_cl-mpipe4", drawSVG: "100%" },
        { id: "#FILL_cl-mpipe5-2", drawSVG: "100%" },
        { id: "#FILL_cl-mpipe6", drawSVG: "100%" },
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
        mainTimeline.to(pipe.id, {
          drawSVG: pipe.drawSVG,
          stagger: 0.05,
          duration: pipe.duration ? pipe.duration : 0.1,
          delay: pipe.delay ? pipe.delay : 0,
        });
      });

      gsap.set("#map-alberta-connectinigline", { drawSVG: 0 });
      mapTimeline.to("#map-alberta-connectinigline", {
        drawSVG: "100%",
        duration: 4,
        delay: 3,
      });

      const labels = [
        { id: ".titles .fort-mcmurray", delay: 0 },
        { id: ".titles .in-situ", delay: 0 },
        { id: ".titles .cold-lake", delay: 0 },
        { id: ".steps .step-1", delay: 2.8 },
        { id: ".steps .step-2", delay: 1 },
        { id: ".steps .step-3", delay: 1 },
        { id: ".steps .step-4", delay: 1 },
      ];

      labels.map((label) => {
        labelTimeline.from(label.id, {
          autoAlpha: 0,
          y: "+=5",
          duration: 0.1,
          delay: label.delay,
        });
      });
    }, illustrationRef.current);

    return () => ctx.revert();
  }, []);
  return (
    <div id="detail-transport">
      <div className="text">
        <AnimSlideUpFadeIn>
          <h2>{t("details.transport.heading")}</h2>
        </AnimSlideUpFadeIn>
        <AnimSlideUpFadeIn delay={0.2}>
          <div className="paragraph-wrapper">
            {t("details.transport.text")
              .split("\n")
              .map((paragraph, i) => (
                <p key={`detail-transport-paragraph-${i}`}>{paragraph}</p>
              ))}
            <p>
              <em>*{t("details.transport.disclaimer")}</em>
            </p>
          </div>
        </AnimSlideUpFadeIn>
      </div>
      <div className="illustration" ref={illustrationRef}>
        <div className="labels">
          <div className="titles">
            <h3 className="fort-mcmurray">
              {t("details.transport.labels.fortMac")}
            </h3>
            <h3 className="in-situ">{t("details.transport.labels.inSitu")}</h3>
            <h3 className="cold-lake">
              {t("details.transport.labels.coldLake")}
            </h3>
          </div>
          <div className="steps">
            <div className="step-1">
              <span>1</span> {t("details.transport.steps.one")}
            </div>
            <div className="step-2">
              <span>2</span> {t("details.transport.steps.two")}
            </div>
            <div className="step-3">
              <span>3</span> {t("details.transport.steps.three")}
            </div>
            <div className="step-4">
              <span>4</span> {t("details.transport.steps.four")}
            </div>
          </div>
        </div>
        <DetailTransportationDetailIllustration />
      </div>
    </div>
  );
};
