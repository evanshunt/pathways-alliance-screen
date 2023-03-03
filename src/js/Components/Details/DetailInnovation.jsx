import AnimSlideUpFadeIn from "../Animations/AnimSlideUpFadeIn";

export default ({ t }) => {
  return (
    <div id="detail-innovation">
      <div className="heading">
        <AnimSlideUpFadeIn>
          <h2>{t("details.innovation.heading")}</h2>
        </AnimSlideUpFadeIn>
        <AnimSlideUpFadeIn delay={0.2}>
          <div className="tooltip tip-left-top">
            <p>{t("details.innovation.tooltip")}</p>
          </div>
        </AnimSlideUpFadeIn>
      </div>
      <div className="buckets">
        <div className="bucket electrification">
          <div className="illustration">
            <AnimSlideUpFadeIn delay={0.4}>
              <img
                src="/images/details/detail-innovation-electrification.png"
                width="100%"
              />
            </AnimSlideUpFadeIn>
          </div>
          <div className="text">
            <AnimSlideUpFadeIn delay={0.5}>
              <h3>{t("details.innovation.bucket1Heading")}</h3>
            </AnimSlideUpFadeIn>
            <AnimSlideUpFadeIn delay={0.6}>
              <p>{t("details.innovation.bucket1Text")}</p>
            </AnimSlideUpFadeIn>
          </div>
        </div>

        <div className="bucket hydrogen">
          <div className="illustration">
            <AnimSlideUpFadeIn delay={0.5}>
              <img
                src="/images/details/detail-innovation-hydrogen.png"
                width="100%"
              />
            </AnimSlideUpFadeIn>
          </div>
          <div className="text">
            <AnimSlideUpFadeIn delay={0.6}>
              <h3>{t("details.innovation.bucket2Heading")}</h3>
            </AnimSlideUpFadeIn>
            <AnimSlideUpFadeIn delay={0.7}>
              <p>{t("details.innovation.bucket2Text")}</p>
            </AnimSlideUpFadeIn>
          </div>
        </div>

        <div className="bucket reactors">
          <div className="illustration">
            <AnimSlideUpFadeIn delay={0.6}>
              <img
                src="/images/details/detail-innovation-reactors.png"
                width="100%"
              />
            </AnimSlideUpFadeIn>
          </div>
          <div className="text">
            <AnimSlideUpFadeIn delay={0.7}>
              <h3>{t("details.innovation.bucket3Heading")}</h3>
            </AnimSlideUpFadeIn>
            <AnimSlideUpFadeIn delay={0.8}>
              <p>{t("details.innovation.bucket3Text")}</p>
            </AnimSlideUpFadeIn>
          </div>
        </div>

        <div className="bucket capture">
          <div className="illustration">
            <AnimSlideUpFadeIn delay={0.7}>
              <img
                src="/images/details/detail-innovation-capture.png"
                width="100%"
              />
            </AnimSlideUpFadeIn>
          </div>
          <div className="text">
            <AnimSlideUpFadeIn delay={0.8}>
              <h3>{t("details.innovation.bucket4Heading")}</h3>
            </AnimSlideUpFadeIn>
            <AnimSlideUpFadeIn delay={0.9}>
              <p>{t("details.innovation.bucket4Text")}</p>
            </AnimSlideUpFadeIn>
          </div>
        </div>
      </div>
    </div>
  );
};
