import AnimSlideUpFadeIn from "../Animations/AnimSlideUpFadeIn";

export default ({ t, isActive }) => {
  return (
    <div id="slide-transportation">
      <div className="illustration">
        <img src="/images/slides/transportation-illustration.png" alt="" />
      </div>
      <div className="text">
        <div className="bucket bucket1">
          <AnimSlideUpFadeIn isActive={isActive}>
            <h2>{t("slides.transportation.headline1")}</h2>
          </AnimSlideUpFadeIn>
          <AnimSlideUpFadeIn isActive={isActive} delay={0.2}>
            <p>{t("slides.transportation.description1")}</p>
          </AnimSlideUpFadeIn>
        </div>
        <div className="bucket bucket2">
          <AnimSlideUpFadeIn isActive={isActive} delay={0.4}>
            <h2>{t("slides.transportation.headline2")}</h2>
          </AnimSlideUpFadeIn>
          <AnimSlideUpFadeIn isActive={isActive} delay={0.6}>
            <p>{t("slides.transportation.description2")}</p>
          </AnimSlideUpFadeIn>
        </div>
        <div className="bucket bucket3">
          <AnimSlideUpFadeIn isActive={isActive} delay={0.8}>
            <h2>{t("slides.transportation.headline3")}</h2>
          </AnimSlideUpFadeIn>
          <AnimSlideUpFadeIn isActive={isActive} delay={1}>
            <p>{t("slides.transportation.description3")}</p>
          </AnimSlideUpFadeIn>
        </div>
      </div>
    </div>
  );
};
