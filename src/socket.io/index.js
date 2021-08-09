import { io } from "socket.io-client";
import Logger from "./logger";
import Listener from "./listener";
import Vue from "vue";

export default class SocketIO {
  constructor({ url, options, debug }) {
    Logger.debug = debug;
    this.url = url;
    this.options = options;
  }
  install(Vue) {
    // Vue 3
    // Vue.config.globalProperties.$socket = this.io;
    // Vue.config.globalProperties.$vueSocketIo = this;
    Vue.prototype.$socket = this.io;
    Vue.prototype.$vueSocketIo = this;

    Logger.info("Vue-Socket.io plugin enabled");
  }

  connect(token) {
    if (!token) return;

    this.io = io(this.url, {
      ...this.options,
      auth: {
        token,
      },
    });
    Vue.prototype.$socket = this.io;
    this.listener = new Listener(this.io);
    Logger.info("Vue-Socket.io connected!");
  }

  disconnect() {
    this.io?.disconnect();
    this.io = null;
    this.listener = null;
    Logger.info("Vue-Socket.io disconnect!");
  }
}
