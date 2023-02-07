const SlideCompanies = ({ t }) => {
  return (
    <div id="slide-together">
      <div className="highlight">
        <h1>
          <span className="number">
            {t("slides.together.highlightPercentage")}
          </span>{" "}
          <span className="text">{t("slides.together.highlightText")}</span>
        </h1>
      </div>
      <div className="stats">
        <div className="bucket">
          <h2>{t("slides.together.bucket1Heading")}</h2>
          <p>{t("slides.together.bucket1Text")}</p>
        </div>
        <div className="bucket">
          <h2>{t("slides.together.bucket2Heading")}</h2>
          <p>{t("slides.together.bucket2Text")}</p>
        </div>
        <div className="bucket reverse">
          <h2>{t("slides.together.bucket3Heading")}</h2>
          <p>{t("slides.together.bucket3Text")}</p>
        </div>
      </div>
    </div>
  );
};

export default SlideCompanies;
