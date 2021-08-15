export default function() {
  return {
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

    roomMessages: {},
    pvMessages: {},

    rooms: [],
    pvRooms: [],
  };
}
