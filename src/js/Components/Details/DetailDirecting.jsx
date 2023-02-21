import AnimSlideUpFadeIn from "../Animations/AnimSlideUpFadeIn";

export default ({ t }) => {
  return (
    <div id="detail-directing">
      <div className="text">
        <AnimSlideUpFadeIn>
          <h2>{t("details.directing.heading")}</h2>
        </AnimSlideUpFadeIn>
        <AnimSlideUpFadeIn delay={0.2}>
          <div>
            {t("details.directing.text")
              .split("\n")
              .map((paragraph, i) => (
                <p key={`detail-directing-paragraph-${i}`}>{paragraph}</p>
              ))}
          </div>
        </AnimSlideUpFadeIn>
      </div>
      <div className="illustration">
        <img
          src="/images/details/detail-directing-illustration.svg"
          width="100%"
        />
      </div>
    </div>
  );
};
