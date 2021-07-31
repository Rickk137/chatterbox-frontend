export default {
  state: () => ({
    currentChannel: "Home",
    channels: [
      {
        id: 1,
        title: "General",
        icon: "mdi-check",
      },
      {
        id: 2,
        title: "Car",
        icon: "mdi-car-lifted-pickup",
      },
    ],
  }),
  mutations: {
    setCurrentChannel(store, currentChannel) {
      store.currentChannel = currentChannel;
    },
  },
  actions: {
    changeChannel({ commit }, { channel }) {
      commit("setCurrentChannel", channel);
    },
  },
  namespaced: true,
};
