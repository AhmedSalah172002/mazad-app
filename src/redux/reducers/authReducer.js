import {
  REGISTER,
  LOGIN_USER,
  FORGET_PASSWORD,
  SEND_CODE,
  NEW_PASSWORD,
} from "../type";

const inital = {
  register: [],
  loginUser: [],
  forget_password: [],
  send_code: [],
  new_password: [],
  loading: true,
};
const authReducer = (state = inital, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        register: action.payload,
      };
    case LOGIN_USER:
      return {
        ...state,
        loginUser: action.payload,
      };
    case FORGET_PASSWORD:
      return {
        ...state,
        forget_password: action.payload,
      };
    case SEND_CODE:
      return {
        ...state,
        send_code: action.payload,
      };
    case NEW_PASSWORD:
      return {
        ...state,
        new_password: action.payload,
      };
    default:
      return state;
  }
};
export default authReducer;
