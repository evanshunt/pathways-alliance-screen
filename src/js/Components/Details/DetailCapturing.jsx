export default ({ t }) => {
  return (
    <div id="detail-capturing">
      <div className="text">
        <h2>{t("details.capturing.heading")}</h2>
        {t("details.capturing.text")
          .split("\n")
          .map((paragraph, i) => (
            <p key={`detail-capturing-paragraph-${i}`}>{paragraph}</p>
          ))}
      </div>
      <div className="illustration">
        <img
          src="/images/details/detail-capturing-illustration.png"
          width="100%"
        />
      </div>
    </div>
  );
};
