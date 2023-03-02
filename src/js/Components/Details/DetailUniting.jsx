import AnimSlideUpFadeIn from "../Animations/AnimSlideUpFadeIn";

export default ({ t }) => {
  return (
    <div id="detail-uniting">
      <div className="text">
        <AnimSlideUpFadeIn>
          <h2>{t("details.uniting.heading")}</h2>
        </AnimSlideUpFadeIn>
        <AnimSlideUpFadeIn delay={0.2}>
          <div className="paragraph-wrapper">
            {t("details.uniting.text")
              .split("\n")
              .map((paragraph, i) => (
                <p key={`detail-uniting-paragraph-${i}`}>{paragraph}</p>
              ))}
          </div>
        </AnimSlideUpFadeIn>
      </div>
      <div className="logos">
        <ul>
          <li className="canadian-natural">
            <AnimSlideUpFadeIn delay={0.4}>
              <img src="/images/logos/canadian-natural.svg" />
            </AnimSlideUpFadeIn>
          </li>
          <li className="cenovus">
            <AnimSlideUpFadeIn delay={0.5}>
              <img src="/images/logos/cenovus.svg" />
            </AnimSlideUpFadeIn>
          </li>
          <li className="conoco-phillips">
            <AnimSlideUpFadeIn delay={0.6}>
              <img src="/images/logos/conoco-phillips.svg" />
            </AnimSlideUpFadeIn>
          </li>
          <li className="imperial">
            <AnimSlideUpFadeIn delay={0.7}>
              <img src="/images/logos/imperial.svg" />
            </AnimSlideUpFadeIn>
          </li>
          <li className="meg">
            <AnimSlideUpFadeIn delay={0.8}>
              <img src="/images/logos/meg.svg" />
            </AnimSlideUpFadeIn>
          </li>
          <li className="suncor">
            <AnimSlideUpFadeIn delay={0.9}>
              <img src="/images/logos/suncor.svg" />
            </AnimSlideUpFadeIn>
          </li>
        </ul>
      </div>
    </div>
  );
};
