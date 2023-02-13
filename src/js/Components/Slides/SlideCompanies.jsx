import AnimSlideUpFadeIn from "../Animations/AnimSlideUpFadeIn";

export default ({ t, isActive }) => {
  return (
    <div id="slide-companies">
      <div className="stats">
        <div className="companies">
          <AnimSlideUpFadeIn isActive={isActive}>
            <h1>
              <span className="number">
                <img src="/images/slides/companies-6.svg" alt="6" width="169" />
              </span>
              <span>{t("slides.companies.headline1")}</span>
            </h1>
          </AnimSlideUpFadeIn>
        </div>
        <div className="goal">
          <AnimSlideUpFadeIn isActive={isActive} delay={0.2}>
            <h1>
              <span className="number">
                <img src="/images/slides/companies-1.svg" alt="1" width="153" />
              </span>
              <span>{t("slides.companies.headline2")}</span>
            </h1>
          </AnimSlideUpFadeIn>
        </div>
      </div>
      <div>
        <ul className="logos">
          <li>
            <AnimSlideUpFadeIn isActive={isActive} delay={0.3}>
              <img src="/images/logos/canadian-natural.png" />
            </AnimSlideUpFadeIn>
          </li>
          <li>
            <AnimSlideUpFadeIn isActive={isActive} delay={0.4}>
              <img src="/images/logos/cenovus.png" />
            </AnimSlideUpFadeIn>
          </li>
          <li>
            <AnimSlideUpFadeIn isActive={isActive} delay={0.5}>
              <img src="/images/logos/conoco-phillips.png" />
            </AnimSlideUpFadeIn>
          </li>
          <li>
            <AnimSlideUpFadeIn isActive={isActive} delay={0.6}>
              <img src="/images/logos/imperial.png" />
            </AnimSlideUpFadeIn>
          </li>
          <li>
            <AnimSlideUpFadeIn isActive={isActive} delay={0.7}>
              <img src="/images/logos/meg.png" />
            </AnimSlideUpFadeIn>
          </li>
          <li>
            <AnimSlideUpFadeIn isActive={isActive} delay={0.8}>
              <img src="/images/logos/suncor.png" />
            </AnimSlideUpFadeIn>
          </li>
        </ul>
      </div>
    </div>
  );
};
