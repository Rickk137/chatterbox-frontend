import Logger from "./logger";

export default class SocketIOListener {
  /**
   * socket.io-client reserved event keywords
   * @type {string[]}
   */
  static staticEvents = [
    "connect",
    "error",
    "disconnect",
    "reconnect",
    "reconnect_attempt",
    "reconnecting",
    "reconnect_error",
    "reconnect_failed",
    "connect_error",
    "connect_timeout",
    "connecting",
    "ping",
    "pong",
  ];

  constructor(io) {
    this.io = io;
    this.register();
  }

  /**
   * Listening all socket.io events
   */
  register() {
    this.io.onevent = (packet) => {
      let [event, ...args] = packet.data;

      if (args.length === 1) args = args[0];

      this.onEvent(event, args);
    };
    SocketIOListener.staticEvents.forEach((event) =>
      this.io.on(event, (args) => this.onEvent(event, args))
    );
  }
  onEvent(event, args) {
    Logger.info(event, { args });
  }
}
