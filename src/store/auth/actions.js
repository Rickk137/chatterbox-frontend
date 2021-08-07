import axios from "axios";
import router from "@/router";

export async function login({ dispatch, commit }, payload) {
  try {
    const { data } = await axios.post("auth/login", payload);

    const { user, access_token } = data;

    commit("SET_USER", user);

    dispatch("storeToken", access_token);

    router.push("/").catch(() => {});
  } catch (error) {
    console.log(error);
  }
}

export async function signup({ dispatch, commit }, payload) {
  try {
    const { data } = await axios.post("auth/signup", payload);

    const { user, access_token } = data;

    commit("SET_USER", user);

    dispatch("storeToken", access_token);

    router.push("/").catch(() => {});
  } catch (error) {
    console.log(error);
  }
}

export async function fetchUser({ dispatch, commit }) {
  try {
    const { data } = await axios.get("auth");
    if (!data) {
      return dispatch("logout");
    }
    const { email, role, name, _id } = data;
    const user = { email, role, name, id: _id };

    commit("SET_USER", user);
  } catch (error) {
    console.log(error);
  }
}

export function storeToken({ commit }, token) {
  console.log("storeToken", token);
  commit("SET_TOKEN", token);
  axios.defaults.headers["Authorization"] = token ? `Bearer ${token}` : "";
}

export async function logout({ commit }) {
  commit("SET_TOKEN", null);
  commit("SET_USER", {});

  axios.defaults.headers.Authorization = "";

  router.push("/auth").catch(() => {});
}
