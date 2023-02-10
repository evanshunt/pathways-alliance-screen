export default ({ t }) => {
  return (
    <div id="detail-storage">
      <div className="text">
        <h2>{t("details.storage.heading")}</h2>
        {t("details.storage.text")
          .split("\n")
          .map((paragraph, i) => (
            <p key={`detail-storage-paragraph-${i}`}>{paragraph}</p>
          ))}
      </div>
      <div className="illustration">
        <img
          src="/images/details/detail-storage-illustration.png"
          width="100%"
        />
      </div>
    </div>
  );
};
