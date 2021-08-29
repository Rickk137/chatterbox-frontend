import Vue from "vue";
import SocketIO from "../socket.io";

const options = {
  transports: ["websocket"],
};
const url = "https://chatterbox666.herokuapp.com/";

Vue.use(
  new SocketIO({
    url,
    options,
    debug: true,
  })
);
