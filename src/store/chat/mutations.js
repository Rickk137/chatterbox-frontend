export function SET_CURRENT_CHANNEL(state, currentChannel) {
  state.currentChannel = currentChannel;
}

export function SET_ROOMS(state, rooms) {
  state.rooms = rooms;
}

export function ADD_ROOM(state, room) {
  state.rooms = [...state.rooms, room];
}
