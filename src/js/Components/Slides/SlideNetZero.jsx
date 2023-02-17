import AnimSlideUpFadeIn from "../Animations/AnimSlideUpFadeIn";

export default ({ t, isActive }) => {
  return (
    <div id="slide-net-zero">
      <h1>
        <AnimSlideUpFadeIn isActive={isActive}>
          <span className="text">{t("slides.netZero.text")}</span>
        </AnimSlideUpFadeIn>
        <AnimSlideUpFadeIn isActive={isActive} delay={0.2}>
          <span className="number">2050</span>
        </AnimSlideUpFadeIn>
      </h1>
    </div>
  );
};
