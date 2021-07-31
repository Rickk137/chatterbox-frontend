import { io } from "socket.io-client";
import Logger from "./logger";
import Listener from "./listener";

export default class SocketIO {
  constructor({ url, options, debug }) {
    Logger.debug = debug;
    this.io = io(url, options);
    this.listener = new Listener(this.io);
  }
  install(Vue) {
    const version = Number(Vue.version.split(".")[0]);

    if (version >= 3) {
      Vue.config.globalProperties.$socket = this.io;
      Vue.config.globalProperties.$vueSocketIo = this;
    } else {
      Vue.prototype.$socket = this.io;
      Vue.prototype.$vueSocketIo = this;
    }
    Logger.info("Vue-Socket.io plugin enabled");
  }
}
