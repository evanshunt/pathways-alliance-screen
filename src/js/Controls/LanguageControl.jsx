import { useTranslation } from "react-i18next";

export default () => {
  const { i18n } = useTranslation("common");

  return (
    <button id="languagetoggle" className={i18n.language === "fr" && 'right'}
      onPointerDown={() => {
        if (i18n.language === "en") {
          i18n.changeLanguage("fr");
        } else if (i18n.language === "fr") {
          i18n.changeLanguage("en");
        }
      }}
    >
      <span className={i18n.language === "en" && 'active'}>EN</span>
      <span className={i18n.language === "fr" && 'active'}>FR</span>
    </button>
  );
};
