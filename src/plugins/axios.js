import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

import store from "../store";

Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = "http://localhost:3333/";

Vue.axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (error && error.response) {
      const { status } = error.response;
      if (status === 401) {
        store.dispatch("auth/logout");
      }
      return Promise.reject(error.response);
    }
    return Promise.reject(error);
  }
);
