import AnimSlideUpFadeIn from "../Animations/AnimSlideUpFadeIn";
import DetailTransportationDetailIllustration from "../SVGs/SVGTransporationDetailIllustration";

export default ({ t }) => {
  return (
    <div id="detail-transport">
      <div className="text">
        <AnimSlideUpFadeIn>
          <h2>{t("details.transport.heading")}</h2>
        </AnimSlideUpFadeIn>
        <AnimSlideUpFadeIn delay={0.2}>
          <div className="paragraph-wrapper">
            {t("details.transport.text")
              .split("\n")
              .map((paragraph, i) => (
                <p key={`detail-transport-paragraph-${i}`}>{paragraph}</p>
              ))}
          </div>
        </AnimSlideUpFadeIn>
      </div>
      <div className="illustration">
        <DetailTransportationDetailIllustration />
      </div>
    </div>
  );
};
