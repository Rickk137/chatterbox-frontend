import Vue from "vue";
import VueRouter from "vue-router";

import store from "@/store";

import MainLayout from "../layout/Main.vue";
import Room from "../views/Room.vue";
import Pv from "../views/Pv.vue";
import Login from "../views/Login.vue";
import Welcome from "../views/Welcome.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: MainLayout,
    meta: { auth: true },
    children: [
      {
        path: "",
        name: "Home",
        component: Welcome,
      },
      {
        path: "/rooms/:roomId",
        name: "Room",
        component: Room,
      },
      {
        path: "/pv/:userId",
        name: "Private",
        component: Pv,
      },
    ],
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
