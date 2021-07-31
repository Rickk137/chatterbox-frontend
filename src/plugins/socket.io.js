import Vue from "vue";
import SocketIO from "../socket.io";

const options = {
  transports: ["websocket"],
};
const url = "http://localhost:3333";

Vue.use(
  new SocketIO({
    url,
    options,
    debug: true,
  })
);
