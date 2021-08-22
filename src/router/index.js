import Vue from "vue";
import VueRouter from "vue-router";

import store from "@/store";

import MainLayout from "../layout/Main.vue";
import Room from "../views/Room.vue";
import Pv from "../views/Pv.vue";
import Login from "../views/Login.vue";
import Call from "../views/Call/index.vue";
import AcceptCall from "../views/Call/accept.vue";

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

      {
        path: "/call/:userId",
        name: "Call",
        component: Call,
      },
      {
        path: "/call/:userId/accept",
        name: "AcceptCall",
        component: AcceptCall,
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
