export default ({ t }) => {
  return (
    <div id="detail-innovation">
      <div className="heading">
        <h2>{t("details.innovation.heading")}</h2>
      </div>
      <div className="buckets">
        <div className="bucket hydrogen">
          <div className="illustration">
            <img
              src="/images/details/detail-innovation-hydrogen.png"
              width="100%"
            />
          </div>
          <div className="text">
            <h3>{t("details.innovation.bucket1Heading")}</h3>
            <p>{t("details.innovation.bucket1Text")}</p>
          </div>
        </div>
        <div className="bucket electrification">
          <div className="illustration">
            <img
              src="/images/details/detail-innovation-electrification.png"
              width="100%"
            />
          </div>
          <div className="text">
            <h3>{t("details.innovation.bucket2Heading")}</h3>
            <p>{t("details.innovation.bucket2Text")}</p>
          </div>
        </div>
        <div className="bucket capture">
          <div className="illustration">
            <img
              src="/images/details/detail-innovation-capture.png"
              width="100%"
            />
          </div>
          <div className="text">
            <h3>{t("details.innovation.bucket3Heading")}</h3>
            <p>{t("details.innovation.bucket3Text")}</p>
          </div>
        </div>
        <div className="bucket reactors">
          <div className="illustration">
            <img
              src="/images/details/detail-innovation-reactors.png"
              width="100%"
            />
          </div>
          <div className="text">
            <h3>{t("details.innovation.bucket4Heading")}</h3>
            <p>{t("details.innovation.bucket4Text")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
