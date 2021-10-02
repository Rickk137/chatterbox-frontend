import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import authModuel from "./auth";
import chatModule from "./chat/index";

import i18n, { getLanguage } from "@/translation/i18n";
import vuetify from "@/plugins/vuetify";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    channels: [],
    currentChannel: 0,
    myIcon: "guest.png",
    myNick: "noname",
    members: [],
    member: 0,
    membersComponentMounted: false,
    showAC: false,
    chats: [],
    loggedIn: false,
    snackbar: null,
    locale: getLanguage(),

    callingDialog: null,

    meetingDialog: null,
    meetingStatus: null,
    peerId: null,
  },
  mutations: {
    setMeetingStatus(store, meetingStatus) {
      store.meetingStatus = meetingStatus;
    },
    setMeetingDialog(store, meetingDialog) {
      store.meetingDialog = meetingDialog;
    },
    setCallingDialog(store, { userId, peerId }) {
      store.callingDialog = userId;
      if (peerId) {
        store.peerId = peerId;
      }
    },
    setLocale(store, locale) {
      store.locale = locale;
    },
    showSnackbar(store, snackbar) {
      store.snackbar = snackbar;
    },
    updateChannels(store, list) {
      store.channels = list;
    },
    changeChannel(store, channel) {
      store.currentChannel = channel;
    },
    updateAvatar(store, url) {
      store.myIcon = url;
    },
    membersMounted(store) {
      store.membersComponentMounted = true;
    },
    pushMembers(store, data) {
      if (!data.id)
        for (let i in data) {
          store.members.push({
            name: data[i].nick,
            img: data[i].img || "guest.png",
            sid: i,
          });
        }
      else
        store.members.push({
          name: data.user.nick,
          img: data.user.img || "guest.png",
          sid: data.id,
        });
    },
    removeMember(store, sid) {
      for (let i in store.members) {
        if (store.members[i].sid == sid) {
          store.members.splice(i, 1);
        }
      }
    },
    toggleAC(store) {
      store.showAC = !store.showAC;
    },

    pushChat(store, data) {
      store.chats.push({
        avatar: data.user.img || "guest.png",
        title: data.user.nick,
        subtitle: data.msg,
      });
      setTimeout(() => {
        let msgElm = window.document.getElementsByClassName("messages")[0];
        //msgElm.scrollTo(0, msgElm.scrollHeight);
        msgElm.scrollTop = msgElm.scrollHeight;
      }, 10);
    },

    setNick(store, nick) {
      store.myNick = nick;
    },

    setLogin(store, bool) {
      store.loggedIn = bool;
    },
  },
  actions: {
    init({ dispatch, state }) {
      dispatch("auth/storeToken", state.auth.token);
      if (state.auth.token) {
        Vue.prototype.$vueSocketIo?.connect(state.auth.token);

        dispatch("auth/fetchUser");
        dispatch("chat/getRooms");
      }
    },
    changeLanguage({ commit }, locale = "fa") {
      vuetify.framework.rtl = locale === "fa";
      i18n.locale = locale;
      localStorage.setItem("lang", locale);
      commit("setLocale", locale);
      axios.defaults.headers["x-custom-lang"] = locale;
    },
    call({ commit }, userId) {
      commit("setMeetingDialog", userId);
      commit("setMeetingStatus", "CALLING");
    },
  },
  modules: {
    chat: chatModule,
    auth: authModuel,
  },
  plugins: [
    createPersistedState({
      paths: ["auth"],
    }),
  ],
});
