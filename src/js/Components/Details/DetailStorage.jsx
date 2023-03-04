import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import AnimSlideUpFadeIn from "../Animations/AnimSlideUpFadeIn";
import SVGStorageIllustration from "../SVGs/SVGStorageIllustration";

export default ({ t }) => {
  const illustrationRef = useRef();

  // The storage illustration is created using a combination of a PNG and an SVG overlapping.
  // A PNG for the earth layers was used because it's a very complicated graphic and really bogs
  // down the browser when attempting to import as a React component.
  // An SVG was used for all the animated pieces (structures, pipes, labels, close ups, etc.)
  // I'm not sure how this actually looks on the touch screen display so I've added a backup plan incase
  // the PNG and SVG aren't lining up correctly. There's a PNG of the entire illustration that can be swapped in.

  // Animation code (Comment this entire useLayoutEffect if the static illustration PNG is used in div.illustration)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const delayOffset = 1.5;
      const mainTimeline = gsap.timeline({
        delay: delayOffset,
        repeat: -1,
        repeatDelay: 30,
      });

      const fadeIn = [
        { id: "#CCS", duration: 0.3, delay: 0.5 },
        { id: "#_03_storage-labels-FPO", duration: 0.3, delay: 1.5 },
      ];

      fadeIn.map((item) => {
        mainTimeline.from(item.id, {
          autoAlpha: 0,
          y: "-=10",
          duration: item.duration ? item.duration : 0.3,
          delay: item.delay,
        });
      });

      const pipes = [
        { id: "#cl-injection-monitoring1", drawSVG: "100%", delay: 2 },
        { id: "#cl-injection-monitoring2", drawSVG: "100%" },
        { id: "#cl-injection-monitoring3", drawSVG: "100%" },
        { id: "#cl-injection-monitoring4", drawSVG: "100%", duration: 0.6 },
        { id: "#cl-injection-main-pipe", drawSVG: "100%", duration: 0.8 },
      ];

      pipes.map((item) => {
        gsap.set(item.id, { drawSVG: 0 });
        mainTimeline.to(item.id, {
          drawSVG: item.drawSVG,
          duration: item.duration ? item.duration : 0.3,
          delay: item.delay ? item.delay : 0,
        });
      });

      // CO2 Injection Path
      const co2Path = [
        { id: "#FILL_PIPE1 path", drawSVG: "100%", delay: 1 },
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
      ];

      co2Path.map((item) => {
        gsap.set(item.id, { drawSVG: 0 });
        mainTimeline.to(item.id, {
          drawSVG: item.drawSVG,
          duration: item.duration ? item.duration : 0.3,
          delay: item.delay ? item.delay : 0,
        });
      });

      mainTimeline.from(
        "#Co2injection-label",
        {
          autoAlpha: 0,
          y: "-=10",
          duration: 0.2,
        },
        "-=3"
      );

      mainTimeline.from("#layer_fill", {
        autoAlpha: 0,
        y: "-=10",
        duration: 2,
      });

      // Closeups
      const closeUps = [
        { id: "#impermiable_lyer", delay: 2 },
        { id: "#porous_rock_labels-2" },
        { id: "#impermiable_layers_ines" },
        { id: "#impermiable_lyer-2" },
        { id: "#porous_rock_callout" },
        { id: "#porous_rock_labels" },
        { id: "#porous_rock_lines" },
        { id: "#porous_rock_callout-2" },
      ];

      closeUps.map((item) => {
        mainTimeline.from(item.id, {
          autoAlpha: 0,
          y: "-=10",
          duration: 0.3,
          delay: item.delay ? item.delay : 0,
        });
      });

      // Monitoring system
      gsap.set("#FILL_cl-injection_monitoring_copy_6 path", { drawSVG: 0 });
      mainTimeline.to("#FILL_cl-injection_monitoring_copy_6 path", {
        drawSVG: "100%",
        duration: 3,
        delay: 2,
      });
      mainTimeline.from(
        "#monitoring_systems_label",
        {
          autoAlpha: 0,
          duration: 0.3,
        },
        "-=3"
      );

      const storageMonitors = [
        { id: "#Storage-monitor_1" },
        { id: "#Storage-monitor2" },
        { id: "#Storage-monitor_3" },
        { id: "#Storage-monitor_4" },
        { id: "#Storage-monitor_5" },
      ];

      storageMonitors.map((item) => {
        mainTimeline.from(item.id, {
          autoAlpha: 0,
          y: "-=10",
          stagger: item.stagger ? item.duration : 0.3,
          duration: item.duration ? item.duration : 0.3,
          delay: item.delay,
        });
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
        {/* Animated PNG + SVG illustration */}
        <SVGStorageIllustration />
        <AnimSlideUpFadeIn delay={0.4}>
          <div>
            <img src="/images/details/detail-storage-earth-layers-illustration.png" />
          </div>
        </AnimSlideUpFadeIn>

        {/* Static PNG of entire illustration Backup */}
        {/* <AnimSlideUpFadeIn delay={0.4}>
          <div>
            <img src="/images/details/detail-storage-illustration.png" />
          </div>
        </AnimSlideUpFadeIn> */}
      </div>
    </div>
  );
};
