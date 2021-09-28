import Vue from "vue";
import SocketIO from "../socket.io";
import { baseURL } from "@/config";

const options = {
  transports: ["websocket"],
};
const url = baseURL;

Vue.use(
  new SocketIO({
    url,
    options,
    debug: true,
  })
);
