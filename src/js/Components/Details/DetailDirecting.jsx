export default ({ t }) => {
  return (
    <div id="detail-directing">
      <div className="text">
        <h2>{t("details.directing.heading")}</h2>
        {t("details.directing.text")
          .split("\n")
          .map((paragraph, i) => (
            <p key={`detail-directing-paragraph-${i}`}>{paragraph}</p>
          ))}
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
