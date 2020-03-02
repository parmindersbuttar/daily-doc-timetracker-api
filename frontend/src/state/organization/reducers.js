import {
  ADD_USER_SUCCESS,
  ADD_USER_FAILED,
  GET_USERS_SUCCESS,
  GET_USER_SUCCESS
} from "./actions";

export const INITIAL_STATE = {
  error: null,
  users: null,
  user: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        user: null,
        error: null
      }
    case ADD_USER_SUCCESS:
      return {
        ...state,
        error: null
      }  
    case ADD_USER_FAILED:    
      return {
        ...state,
        error: action.payload
      }
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null
      }    
    default:
      return state;
  }
};