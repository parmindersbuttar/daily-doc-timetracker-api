export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'auth/CLEAR_USER';
export const RECOVER_PASSWORD_FAILED = 'RECOVER_PASSWORD_FAILED';
export const RECOVER_PASSWORD_SUCCESS = 'RECOVER_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user
});

export const loginFailed = (error) => ({
  type: LOGIN_FAILED,
  payload: error
});

export const logout = () => ({
  type: LOGOUT
});

export const recoverPasswordFailed = (error) => ({
  type: RECOVER_PASSWORD_FAILED,
  payload: error
});

export const recoverPasswordSuccess = () => ({
  type: RECOVER_PASSWORD_SUCCESS
});

export const resetPasswordFailed = (error) => ({
  type: RESET_PASSWORD_FAILED,
  payload: error
});

export const resetPasswordSuccess = () => ({
  type: RESET_PASSWORD_SUCCESS
});