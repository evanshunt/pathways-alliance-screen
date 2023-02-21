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
          <li>
            <AnimSlideUpFadeIn delay={0.4}>
              <img src="/images/logos/canadian-natural.png" />
            </AnimSlideUpFadeIn>
          </li>
          <li>
            <AnimSlideUpFadeIn delay={0.5}>
              <img src="/images/logos/cenovus.png" />
            </AnimSlideUpFadeIn>
          </li>
          <li>
            <AnimSlideUpFadeIn delay={0.6}>
              <img src="/images/logos/conoco-phillips.png" />
            </AnimSlideUpFadeIn>
          </li>
          <li>
            <AnimSlideUpFadeIn delay={0.7}>
              <img src="/images/logos/imperial.png" />
            </AnimSlideUpFadeIn>
          </li>
          <li>
            <AnimSlideUpFadeIn delay={0.8}>
              <img src="/images/logos/meg.png" />
            </AnimSlideUpFadeIn>
          </li>
          <li>
            <AnimSlideUpFadeIn delay={0.9}>
              <img src="/images/logos/suncor.png" />
            </AnimSlideUpFadeIn>
          </li>
        </ul>
      </div>
    </div>
  );
};
