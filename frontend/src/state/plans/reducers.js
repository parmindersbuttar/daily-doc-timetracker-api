import {
  GET_PLANS_SUCCESS,
  GET_PLANS_FAILED
} from "./actions";

export const INITIAL_STATE = {
  data: null,
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PLANS_SUCCESS:
      return {
        ...state,
        data: action.payload
      }
    case GET_PLANS_FAILED:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};