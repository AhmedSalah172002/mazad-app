import { UPDATE_LOGGED_USER } from "../type";

const initial = {
  updateLoggedUser: [],
};

const loggedUserReducer = (state = initial, action) => {
  switch (action.type) {
    case UPDATE_LOGGED_USER:
      return {
        ...state,
        updateLoggedUser: action.payload,
      };
    default:
      return state;
  }
};
export default loggedUserReducer;
