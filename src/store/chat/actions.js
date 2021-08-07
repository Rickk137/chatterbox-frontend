import axios from "axios";

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
