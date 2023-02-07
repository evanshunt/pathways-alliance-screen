const SlideTransportation = ({ t }) => {
  return (
    <div id="slide-transportation">
      <div className="illustration">
        <img src="/images/slides/transportation-illustration.png" alt="" />
      </div>
      <div className="text">
        <div className="bucket bucket1">
          <h2>{t("slides.transportation.headline1")}</h2>
          <p>{t("slides.transportation.description1")}</p>
        </div>
        <div className="bucket bucket2">
          <h2>{t("slides.transportation.headline2")}</h2>
          <p>{t("slides.transportation.description2")}</p>
        </div>
        <div className="bucket bucket3">
          <h2>{t("slides.transportation.headline3")}</h2>
          <p>{t("slides.transportation.description3")}</p>
        </div>
      </div>
    </div>
  );
};

export default SlideTransportation;
