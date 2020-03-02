import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  RECOVER_PASSWORD_FAILED,
  RECOVER_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_SUCCESS
} from "./actions";

export const INITIAL_STATE = {
  logged: false,
  error: null,
  user: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        logged: true,
        error: null
      }
    case LOGIN_FAILED:
    case RECOVER_PASSWORD_FAILED:
    case RESET_PASSWORD_FAILED:  
      return {
        ...state,
        error: action.payload
      }; 
    case RECOVER_PASSWORD_SUCCESS:
    case RESET_PASSWORD_SUCCESS:  
      return {
        ...state,
        error: null
      }  
    case LOGOUT:
      localStorage.clear();
      return {
        ...INITIAL_STATE
      };
    default:
      return state;
  }
};