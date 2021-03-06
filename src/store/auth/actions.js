import Vue from "vue";
import axios from "axios";
import router from "@/router";
import i18n from "@/translation/i18n";

export async function login({ dispatch, commit }, payload) {
  try {
    const { data } = await axios.post("auth/login", payload);

    const { user, access_token } = data;

    commit("SET_USER", user);

    dispatch("storeToken", access_token);

    dispatch("init", null, {
      root: true,
    });

    router.push("/").catch(() => {});
  } catch (error) {
    if (error?.data?.message) {
      commit(
        "showSnackbar",
        {
          content: error.data.message,
          color: "error",
        },
        { root: true }
      );
    }
  }
}

export async function signup({ dispatch, commit }, payload) {
  try {
    const { data } = await axios.post("auth/signup", payload);

    const { user, access_token } = data;

    commit("SET_USER", user);

    dispatch("storeToken", access_token);

    dispatch("init", null, {
      root: true,
    });

    router.push("/").catch(() => {});
  } catch (error) {
    if (error?.data?.message) {
      commit(
        "showSnackbar",
        {
          content: error.data.message,
          color: "error",
        },
        { root: true }
      );
    }
  }
}

export async function fetchUser({ dispatch, commit }) {
  try {
    const { data } = await axios.get("auth/me");
    if (!data) {
      return dispatch("logout");
    }
    const { email, name, family, username, privateRooms, _id } = data;
    const user = { email, name, family, username, id: _id };

    commit("chat/SET_PV_ROOMS", privateRooms, {
      root: true,
    });

    commit("SET_USER", user);
  } catch (error) {
    console.log(error);
  }
}

export async function updateProfile({ dispatch, commit }, payload) {
  try {
    const { data } = await axios.patch("auth/me", payload);
    if (!data) {
      return dispatch("logout");
    }
    const { email, name, family, username, _id } = data;
    const user = { email, name, family, username, id: _id };

    commit("SET_USER", user);

    commit(
      "showSnackbar",
      {
        content: i18n.t("done"),
        color: "success",
      },
      { root: true }
    );
  } catch (error) {
    console.log(error);
    if (error?.data?.message) {
      commit(
        "showSnackbar",
        {
          content: error.data.message,
          color: "error",
        },
        { root: true }
      );
    }
  }
}

export function storeToken({ commit }, token) {
  commit("SET_TOKEN", token);
  axios.defaults.headers["Authorization"] = token ? `Bearer ${token}` : "";
}

export async function logout({ commit }) {
  commit("SET_TOKEN", null);
  commit("SET_USER", null);

  commit("chat/RESET", null, {
    root: true,
  });

  axios.defaults.headers.Authorization = "";

  Vue.prototype.$vueSocketIo?.disconnect();

  router.push("/auth").catch(() => {});
}
