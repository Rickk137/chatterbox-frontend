export function SET_TOKEN(state, token) {
  state.token = token;
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
}
export function SET_USER(state, user) {
  state.user = user;
}
