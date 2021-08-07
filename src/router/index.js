import Vue from "vue";
import VueRouter from "vue-router";

import store from "@/store";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { auth: true },
  },
  {
    path: "/auth",
    name: "Login",
    component: Login,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeResolve((to, _from, next) => {
  const loggedIn = !!store.state.auth.token;

  if (to.matched.some((route) => route.meta.auth) && !loggedIn) {
    return next("/auth");
  }

  return next();
});

export default router;
