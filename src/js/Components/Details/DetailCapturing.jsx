import AnimSlideUpFadeIn from "../Animations/AnimSlideUpFadeIn";
import SVGCapturingIllustration from "../SVGs/SVGCapturingIllustration";

export default ({ t }) => {
  return (
    <div id="detail-capturing">
      <div className="text">
        <AnimSlideUpFadeIn>
          <h2>{t("details.capturing.heading")}</h2>
        </AnimSlideUpFadeIn>
        <AnimSlideUpFadeIn delay={0.2}>
          <div className="paragraph-wrapper">
            {t("details.capturing.text")
              .split("\n")
              .map((paragraph, i) => (
                <p key={`detail-capturing-paragraph-${i}`}>{paragraph}</p>
              ))}
          </div>
        </AnimSlideUpFadeIn>
      </div>
      <div className="illustration">
        <SVGCapturingIllustration />
      </div>
    </div>
  );
};
