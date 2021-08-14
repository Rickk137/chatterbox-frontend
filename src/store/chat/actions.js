import axios from "axios";
import { receiverTypes } from "@/constants/types";

export function changeChannel({ commit }, { channel }) {
  commit("SET_CURRENT_CHANNEL", channel);
}

export async function getRooms({ commit }) {
  try {
    const { data } = await axios.get("rooms");
    commit("SET_ROOMS", data);
  } catch (error) {
    console.log(error);
  }
}

export async function newMessage({ commit }, msg) {
  if (msg.type === receiverTypes.ROOM) {
    commit("ADD_ROOM_MESSAGE", msg);
  }
}
export async function getRoomMessages({ commit, state }, { roomId, page }) {
  if (state.roomMessages[roomId]?.page >= page) return;
  try {
    const { data } = await axios.get(`messages/rooms/${roomId}?page=${page}`);

    commit("UPDATE_ROOM_MESSAGES", { list: data, roomId, page: 1 });
  } catch (error) {
    console.log(error);
  }
}
