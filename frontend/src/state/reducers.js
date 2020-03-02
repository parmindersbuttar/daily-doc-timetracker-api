import authReducer from './auth/reducers';
import planReducer from './plans/reducers';

export default ({ auth, plans }, action) => ({
  auth: authReducer(auth, action),
  plans: planReducer(plans, action)
});