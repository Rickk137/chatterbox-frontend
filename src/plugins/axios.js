import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { getLanguage } from "@/translation/i18n";

import store from "../store";

export const getHeader = () => {
  const token = localStorage.getItem("token");
  return token ? `Bearer ${token}` : "";
};

Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = "https://chatterbox666.herokuapp.com/";
Vue.axios.defaults.headers.Authorization = getHeader();
Vue.axios.defaults.headers["x-custom-lang"] = getLanguage();

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
