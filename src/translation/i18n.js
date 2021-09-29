import Vue from "vue";
import VueI18n from "vue-i18n";
import enTranslations from "./en";
import faTranslations from "./fa";

Vue.use(VueI18n);

export const getLanguage = () => {
  return localStorage.getItem("lang") || "fa";
};

const i18n = new VueI18n({
  locale: getLanguage() || "fa",
  messages: {
    en: enTranslations,
    fa: faTranslations,
  },
  silentFallbackWarn: true,
});

export default i18n;
