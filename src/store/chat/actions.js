import axios from "axios";
import { receiverTypes, LIMIT } from "@/constants/types";
import store from "../index";
import router from "@/router";

export function changeChannel({ commit }, { channel }) {
  commit("SET_CURRENT_CHANNEL", channel);
}

export async function addPvRoom({ commit }, id) {
  try {
    const { data } = await axios.get("users/" + id);
    commit("ADD_PV_ROOM", data);
  } catch (error) {
    console.log(error);
  }
}

export async function getRooms({ commit }) {
  try {
    const { data } = await axios.get("rooms");
    commit("SET_ROOMS", data);
  } catch (error) {
    console.log(error);
  }
}

export async function newMessage({ commit, dispatch, state }, msg) {
  if (msg.type === receiverTypes.ROOM) {
    commit("ADD_ROOM_MESSAGE", msg);
  } else if (msg.type === receiverTypes.USER) {
    const currentId = store.state.auth.user?.id;
    if (!currentId) return;
    const roomKey = msg.author === currentId ? msg.receiver : msg.author;

    commit("ADD_PV_MESSAGE", { msg, currentId, roomKey });

    if (!state.pvRooms.find((room) => room._id === roomKey)) {
      dispatch("addPvRoom", roomKey);
    }
  }
}

export async function getRoomMessages({ commit, state }, { roomId, loadMore }) {
  if (state.roomMessages[roomId]?.noMore) return;

  if (!loadMore && state.roomMessages[roomId]?.messages?.length > 0) return;

  let timestamp;
  if (state.roomMessages[roomId]?.messages[0]) {
    timestamp = state.roomMessages[roomId]?.messages[0].timestamp;
  }

  try {
    const { data } = await axios.get(`messages/rooms/${roomId}`, {
      params: {
        timestamp,
        limit: LIMIT,
      },
    });

    commit("UPDATE_ROOM_MESSAGES", { list: data, roomId });

    return data;
  } catch (error) {
    console.log(error);
    router.push("/").catch(() => {});
  }
}

export async function getPvMessages({ commit, state }, { userId, loadMore }) {
  if (state.pvMessages[userId]?.noMore) return;
  if (!loadMore && state.pvMessages[userId]?.messages?.length > 0) return;

  let timestamp;
  if (state.pvMessages[userId]?.messages[0]) {
    timestamp = state.pvMessages[userId]?.messages[0].timestamp;
  }

  try {
    const { data } = await axios.get(`messages/pv/${userId}`, {
      params: {
        timestamp,
        limit: LIMIT,
      },
    });

    commit("UPDATE_PV_MESSAGES", { list: data, userId });

    return data;
  } catch (error) {
    console.log(error);
  }
}
