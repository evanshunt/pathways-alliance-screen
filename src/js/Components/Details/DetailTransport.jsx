export default ({ t }) => {
  return (
    <div id="detail-transport">
      <div className="text">
        <h2>{t("details.transport.heading")}</h2>
        {t("details.transport.text")
          .split("\n")
          .map((paragraph, i) => (
            <p key={`detail-transport-paragraph-${i}`}>{paragraph}</p>
          ))}
      </div>
      <div className="illustration">
        <img
          src="/images/details/detail-transport-illustration.png"
          width="100%"
        />
      </div>
    </div>
  );
};
