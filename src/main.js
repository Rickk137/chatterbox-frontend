import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import VueSocketIO from "vue-socket.io";
import { io } from "socket.io-client";

const options = {
  transports: ["websocket"],
};

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: io("http://localhost:3333", options),
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_",
    },
  })
);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
