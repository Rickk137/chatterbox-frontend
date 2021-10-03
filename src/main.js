import Vue from "vue";

import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import i18n from "@/translation/i18n";

import VuePlyr from "vue-plyr";
import "vue-plyr/dist/vue-plyr.css";

import "./plugins/axios";
import "./plugins/socket.io";

Vue.config.productionTip = false;

Vue.use(VuePlyr, {
  plyr: {},
});

new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");

store.dispatch("init");
