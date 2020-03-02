export const GET_PLANS_SUCCESS = 'plan/GET_PLANS_SUCCESS';
export const GET_PLANS_FAILED = 'auth/GET_PLANS_SUCCESS';

export const getPlanSuccess = (plans) => ({
  type: GET_PLANS_SUCCESS,
  payload: plans
});

export const getPlanFailed = (error) => ({
  type: GET_PLANS_FAILED,
  payload: error
});
