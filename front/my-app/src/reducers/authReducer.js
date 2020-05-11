export default function authReducer(state = {}, action) {
  switch (action.type) {
    case "TOGGLE_SESSION":
      return { ...state, token: action.token, message: action.message };
    default:
      return state;
  }
}
