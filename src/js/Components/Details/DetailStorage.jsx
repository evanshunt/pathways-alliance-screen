import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import AnimSlideUpFadeIn from "../Animations/AnimSlideUpFadeIn";
import SVGStorageIllustration from "../SVGs/SVGStorageIllustration";

export default ({ t }) => {
  const illustrationRef = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const delayOffset = 1.5;
      const mainTimeline = gsap.timeline({ delay: delayOffset });

      // const structures = [{ id: "#earthlayers" }];
      // structures.map((structure) => {
      //   mainTimeline.from(structure.id, {
      //     autoAlpha: 0,
      //     y: "-=10",
      //     duration: 0.2,
      //   });
      // });
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
      </div>
    </div>
  );
};
