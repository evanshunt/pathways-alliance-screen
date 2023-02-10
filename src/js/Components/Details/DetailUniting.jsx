export default ({ t }) => {
  return (
    <div id="detail-uniting">
      <div className="text">
        <h2>{t("details.uniting.heading")}</h2>
        {t("details.uniting.text")
          .split("\n")
          .map((paragraph, i) => (
            <p key={`detail-uniting-paragraph-${i}`}>{paragraph}</p>
          ))}
      </div>
      <div className="illustration">
        <ul className="logos">
          <li>
            <img src="/images/logos/canadian-natural.png" />
          </li>
          <li>
            <img src="/images/logos/cenovus.png" />
          </li>
          <li>
            <img src="/images/logos/conoco-phillips.png" />
          </li>
          <li>
            <img src="/images/logos/imperial.png" />
          </li>
          <li>
            <img src="/images/logos/meg.png" />
          </li>
          <li>
            <img src="/images/logos/suncor.png" />
          </li>
        </ul>
      </div>
    </div>
  );
};
