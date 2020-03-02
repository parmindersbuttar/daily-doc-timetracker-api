export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_FAILED = 'ADD_USER_FAILED';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';

export const getUsersSuccess = (users) => ({
  type: GET_USERS_SUCCESS,
  payload: users
});

export const getUserSuccess = (user) => ({
  type: GET_USER_SUCCESS,
  payload: user
});


export const addUserSuccess = () => ({
  type: ADD_USER_SUCCESS
});

export const addUserFailed = (error) => ({
  type: ADD_USER_FAILED,
  payload: error
});