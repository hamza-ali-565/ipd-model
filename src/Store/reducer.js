import {
  BASE_URL,
  SET_LOGIN,
  SET_LOGIN_TOGGLE,
  SET_RESPONSE,
  SET_SHIFT,
} from "./actionType";

const initialState = {
  login: null,
  url:
    window.location.href.split(":")[0] === "http"
      ? `http://localhost:3001/api/v1`
      : `https://ipd-server.vercel.app/api/v1`,
  toggle: null,
  response: [], // Add response to the initial state
  shift: [],
};

export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN:
      return {
        ...state,
        login: action.payload,
      };
    case SET_LOGIN_TOGGLE:
      return {
        ...state,
        toggle: action.payload,
      };
    case BASE_URL:
      return {
        ...state,
        url: state.url,
      };
    case SET_RESPONSE:
      return {
        ...state,
        response: action.payload,
      };
    case SET_SHIFT:
      return {
        ...state,
        shift: action.payload,
      };
    default:
      return state;
  }
};
