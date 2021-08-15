import store from "../index";
import { LIMIT } from "../../constants/types";

export function SET_CURRENT_CHANNEL(state, currentChannel) {
  state.currentChannel = currentChannel;
}

export function SET_PV_ROOMS(state, pvRooms) {
  state.pvRooms = pvRooms;
}
export function SET_ROOMS(state, rooms) {
  state.rooms = rooms;
}

export function ADD_ROOM(state, room) {
  state.rooms = [...state.rooms, room];
}

export function ADD_ROOM_MESSAGE(state, msg) {
  const currentId = store.state.auth.user?.id;
  if (!currentId) return;

  const roomMessages = { ...state.roomMessages };
  roomMessages[msg.receiver] = roomMessages[msg.receiver] || {
    messages: [],
    page: 0,
    notification: false,
  };

  const messages = roomMessages[msg.receiver].messages || [];
  messages.push(msg);
  roomMessages[msg.receiver].messages = messages;
  roomMessages[msg.receiver].notification = msg.author !== currentId;

  state.roomMessages = roomMessages;
}

export function UPDATE_ROOM_MESSAGES(state, { list, roomId }) {
  const roomMessages = { ...state.roomMessages };
  roomMessages[roomId] = roomMessages[roomId] || {
    messages: [],
    notification: false,
  };

  let messages = roomMessages[roomId].messages || [];
  messages = [...list, ...messages];
  roomMessages[roomId].messages = messages;
  roomMessages[roomId].notification = false;
  roomMessages[roomId].noMore = list.length < LIMIT;

  state.roomMessages = roomMessages;
}

export function ADD_PV_MESSAGE(state, msg) {
  const currentId = store.state.auth.user?.id;
  if (!currentId) return;

  const key = msg.author === currentId ? msg.receiver : msg.author;

  const pvMessages = { ...state.pvMessages };
  pvMessages[key] = pvMessages[key] || {
    messages: [],
    page: 0,
    notification: false,
  };

  const messages = pvMessages[key].messages || [];
  messages.push(msg);
  // should be always target id;
  pvMessages[key].messages = messages;
  pvMessages[key].notification = msg.author !== currentId;

  state.pvMessages = pvMessages;
}

export function UPDATE_PV_MESSAGES(state, { list, userId }) {
  const pvMessages = { ...state.pvMessages };
  pvMessages[userId] = pvMessages[userId] || {
    messages: [],
    notification: false,
  };

  let messages = pvMessages[userId].messages || [];
  messages = [...list, ...messages];
  pvMessages[userId].messages = messages;
  pvMessages[userId].notification = false;
  pvMessages[userId].noMore = list.length < LIMIT;

  state.pvMessages = pvMessages;
}
