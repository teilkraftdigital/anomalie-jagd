import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import de from "./locale/de";
import en from "./locale/en";

const savedLang = localStorage.getItem("lang");
const browserLang = navigator.language.startsWith("de") ? "de" : "en";

i18n.use(initReactI18next).init({
  resources: {
    de: { common: de },
    en: { common: en },
  },
  lng: savedLang ?? browserLang,
  fallbackLng: "de",
  defaultNS: "common",
  interpolation: { escapeValue: false },
});

export default i18n;
