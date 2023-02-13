import AnimSlideUpFadeIn from "../Animations/AnimSlideUpFadeIn";

export default ({ t, isActive }) => {
  return (
    <div id="slide-together">
      <div className="highlight">
        <h1>
          <span className="number">
            {t("slides.together.highlightPercentage")}
          </span>{" "}
          <span className="text">{t("slides.together.highlightText")}</span>
        </h1>
      </div>
      <div className="stats">
        <div className="bucket">
          <AnimSlideUpFadeIn isActive={isActive}>
            <h2>{t("slides.together.bucket1Heading")}</h2>
          </AnimSlideUpFadeIn>
          <AnimSlideUpFadeIn isActive={isActive} delay={0.2}>
            <p>{t("slides.together.bucket1Text")}</p>
          </AnimSlideUpFadeIn>
        </div>

        <div className="bucket">
          <AnimSlideUpFadeIn isActive={isActive} delay={0.4}>
            <h2>{t("slides.together.bucket2Heading")}</h2>
          </AnimSlideUpFadeIn>
          <AnimSlideUpFadeIn isActive={isActive} delay={0.6}>
            <p>{t("slides.together.bucket2Text")}</p>
          </AnimSlideUpFadeIn>
        </div>
        <div className="bucket reverse">
          <AnimSlideUpFadeIn isActive={isActive} delay={1}>
            <h2>{t("slides.together.bucket3Heading")}</h2>
          </AnimSlideUpFadeIn>
          <AnimSlideUpFadeIn isActive={isActive} delay={0.8}>
            <p>{t("slides.together.bucket3Text")}</p>
          </AnimSlideUpFadeIn>
        </div>
      </div>
    </div>
  );
};
