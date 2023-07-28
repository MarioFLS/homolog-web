import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import PTBR from "../locales/pt/pt-br.json";
import ENUS from "../locales/en/en-us.json";

const resources = {
	pt: PTBR,
	en: ENUS,
};

i18n.use(initReactI18next).init({
	resources,
	lng: 'pt',
	interpolation: { escapeValue: false },
	fallbackLng: "en"
});

export default i18n;