const SlideCompanies = ({ t }) => {
  return (
    <div id="slide-companies">
      <div className="stats">
        <div className="companies">
          <h1>
            <span className="number">{t("slides.companies.number1")}</span>{" "}
            <span>{t("slides.companies.headline1")}</span>
          </h1>
        </div>
        <div className="goal">
          <h1>
            <span className="number">{t("slides.companies.number2")}</span>{" "}
            <span>{t("slides.companies.headline2")}</span>
          </h1>
        </div>
      </div>
      <div>
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

export default SlideCompanies;
