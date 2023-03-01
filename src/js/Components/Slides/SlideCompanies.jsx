import AnimSlideUpFadeIn from "../Animations/AnimSlideUpFadeIn";

export default ({ t, isActive }) => {
  return (
    <div id="slide-companies">
      <div className="stats">
        <div className="companies">
          <AnimSlideUpFadeIn isActive={isActive}>
            <h1>
              <span className="number">6</span>
              <span className="text">{t("slides.companies.headline1")}</span>
            </h1>
          </AnimSlideUpFadeIn>
        </div>
        <div className="goal">
          <AnimSlideUpFadeIn isActive={isActive} delay={0.2}>
            <h1>
              <span className="number">1</span>
              <span className="text">{t("slides.companies.headline2")}</span>
            </h1>
          </AnimSlideUpFadeIn>
        </div>
      </div>
      <div>
        <ul className="logos">
          <li>
            <AnimSlideUpFadeIn isActive={isActive} delay={0.3}>
              <img
                className="logo-canadian-natural"
                src="/images/logos/canadian-natural.svg"
              />
            </AnimSlideUpFadeIn>
          </li>
          <li>
            <AnimSlideUpFadeIn isActive={isActive} delay={0.4}>
              <img className="logo-cenovus" src="/images/logos/cenovus.svg" />
            </AnimSlideUpFadeIn>
          </li>
          <li>
            <AnimSlideUpFadeIn isActive={isActive} delay={0.5}>
              <img
                className="logo-conoco-phillips"
                src="/images/logos/conoco-phillips.svg"
              />
            </AnimSlideUpFadeIn>
          </li>
          <li>
            <AnimSlideUpFadeIn isActive={isActive} delay={0.6}>
              <img className="logo-imperial" src="/images/logos/imperial.svg" />
            </AnimSlideUpFadeIn>
          </li>
          <li>
            <AnimSlideUpFadeIn isActive={isActive} delay={0.7}>
              <img className="logo-meg" src="/images/logos/meg.svg" />
            </AnimSlideUpFadeIn>
          </li>
          <li>
            <AnimSlideUpFadeIn isActive={isActive} delay={0.8}>
              <img className="logo-suncor" src="/images/logos/suncor.svg" />
            </AnimSlideUpFadeIn>
          </li>
        </ul>
      </div>
    </div>
  );
};
