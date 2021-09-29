import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import { getLanguage } from "@/translation/i18n";

Vue.use(Vuetify);

export default new Vuetify({
  rtl: getLanguage() === "fa",
});
