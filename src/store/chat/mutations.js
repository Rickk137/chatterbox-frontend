export function SET_CURRENT_CHANNEL(state, currentChannel) {
  state.currentChannel = currentChannel;
}

export function SET_ROOMS(state, rooms) {
  state.rooms = rooms;
}

export function ADD_ROOM(state, room) {
  state.rooms = [...state.rooms, room];
}

export function ADD_ROOM_MESSAGE(state, msg) {
  const roomMessages = { ...state.roomMessages };
  roomMessages[msg.receiver] = roomMessages[msg.receiver] || {
    messages: [],
    page: 0,
  };

  const messages = roomMessages[msg.receiver].messages || [];
  messages.push(msg);
  roomMessages[msg.receiver].messages = messages;

  state.roomMessages = roomMessages;
}

export function UPDATE_ROOM_MESSAGES(state, { list, roomId, page }) {
  const roomMessages = { ...state.roomMessages };
  roomMessages[roomId] = roomMessages[roomId] || {
    messages: [],
    page: 0,
  };

  let messages = roomMessages[roomId].messages || [];
  messages = [...list, ...messages];
  roomMessages[roomId].messages = messages;
  roomMessages[roomId].page = page;

  state.roomMessages = roomMessages;
}
