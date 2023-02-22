import AnimSlideUpFadeIn from "../Animations/AnimSlideUpFadeIn";
import SVGStorageIllustration from "../SVGs/SVGStorageIllustration";

export default ({ t }) => {
  return (
    <div id="detail-storage">
      <div className="text">
        <AnimSlideUpFadeIn>
          <h2>{t("details.storage.heading")}</h2>
        </AnimSlideUpFadeIn>
        <AnimSlideUpFadeIn delay={0.2}>
          <div className="paragraph-wrapper">
            {t("details.storage.text")
              .split("\n")
              .map((paragraph, i) => (
                <p key={`detail-storage-paragraph-${i}`}>{paragraph}</p>
              ))}
          </div>
        </AnimSlideUpFadeIn>
      </div>
      <div className="illustration">
        <SVGStorageIllustration />
      </div>
    </div>
  );
};
