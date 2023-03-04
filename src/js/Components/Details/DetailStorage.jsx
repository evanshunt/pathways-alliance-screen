import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import AnimSlideUpFadeIn from "../Animations/AnimSlideUpFadeIn";
import SVGStorageIllustration from "../SVGs/SVGStorageIllustration";

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

      const structures = [{ id: "#earthlayers" }];
      structures.map((structure) => {
        mainTimeline.from(structure.id, {
          autoAlpha: 0,
          y: "-=10",
          duration: 0.2,
        });
      });

      const pipes = [
        { id: "#FILL_PIPE1 path", drawSVG: "100%" },
        { id: "#FILL_PIPE2 path", drawSVG: "100%" },
        { id: "#FILL_cl-mpipe3", drawSVG: "100%" },
        { id: "#FILL_cl-mpipe4", drawSVG: "100%" },
        { id: "#FILL_cl-mpipe5-2", drawSVG: "100%" },
        { id: "#FILL_cl-mpipe6", drawSVG: "100%" },
        {
          id: "#FILL_cl-injection-main-pipe_copy_7",
          drawSVG: "100%",
          duration: 3,
        },
        {
          id: "#FILL_cl-injection_monitoring_copy_6 path",
          drawSVG: "100%",
          duration: 1,
        },
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

      mainTimeline.from("#_03_storage-labels-FPO", {
        autoAlpha: 0,
        y: "-=10",
        duration: 0.2,
      });
    }, illustrationRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <div id="detail-storage">
      <div className="text">
        <AnimSlideUpFadeIn>
          <h2>{t("details.storage.heading")}</h2>
        </AnimSlideUpFadeIn>
        <AnimSlideUpFadeIn delay={0.2}>
          <div className="paragraph-wrapper">
            {t("details.storage.text")
              .split("\n")
              .map((paragraph, i) => (
                <p key={`detail-storage-paragraph-${i}`}>{paragraph}</p>
              ))}
            <p>
              <em>*{t("details.storage.disclaimer")}</em>
            </p>
          </div>
        </AnimSlideUpFadeIn>
      </div>
      <div className="illustration" ref={illustrationRef}>
        <SVGStorageIllustration />
        <AnimSlideUpFadeIn delay={0.4}>
          <div>
            <img src="/images/details/detail-storage-earth-layers-illustration.png" />
          </div>
        </AnimSlideUpFadeIn>
      </div>
    </div>
  );
};
