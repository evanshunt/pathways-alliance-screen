import AnimNumberAccumulator from "../Animations/AnimNumberAccumulator";
import AnimSlideUpFadeIn from "../Animations/AnimSlideUpFadeIn";

export default ({ t, isActive }) => {
  return (
    <div id="slide-together">
      <div className="highlight">
        <h1>
          <span className="text">
            {t("slides.together.highlightBeforeNumberText")}
          </span>
          <span className="number">
            <AnimNumberAccumulator
              number={95}
              isActive={isActive}
              toFixed={0}
            />
            %
          </span>{" "}
          <span className="text">
            {t("slides.together.highlightAfterNumberText")}
          </span>
        </h1>
      </div>
      <div className="stats">
        <div className="bucket">
          <AnimSlideUpFadeIn isActive={isActive}>
            <h2>
              $
              <AnimNumberAccumulator
                number={16.5}
                isActive={isActive}
                toFixed={1}
              />{" "}
              {t("slides.together.bucket1Heading")}
            </h2>
          </AnimSlideUpFadeIn>
          <AnimSlideUpFadeIn isActive={isActive} delay={0.2}>
            <p>{t("slides.together.bucket1Text")}</p>
          </AnimSlideUpFadeIn>
        </div>

        <div className="bucket">
          <AnimSlideUpFadeIn isActive={isActive} delay={0.4}>
            <h2>
              $
              <AnimNumberAccumulator
                number={7.6}
                isActive={isActive}
                toFixed={1}
                delay={0.4}
              />{" "}
              {t("slides.together.bucket2Heading")}
            </h2>
          </AnimSlideUpFadeIn>
          <AnimSlideUpFadeIn isActive={isActive} delay={0.6}>
            <p>{t("slides.together.bucket2Text")}</p>
          </AnimSlideUpFadeIn>
        </div>
        <div className="bucket reverse">
          <AnimSlideUpFadeIn isActive={isActive} delay={1}>
            <h2>
              <AnimNumberAccumulator
                number={35000}
                isActive={isActive}
                toFixed={0}
                delay={1}
              />{" "}
              {t("slides.together.bucket3Heading")}
            </h2>
          </AnimSlideUpFadeIn>
          <AnimSlideUpFadeIn isActive={isActive} delay={0.8}>
            <p>{t("slides.together.bucket3Text")}</p>
          </AnimSlideUpFadeIn>
        </div>
      </div>
    </div>
  );
};
