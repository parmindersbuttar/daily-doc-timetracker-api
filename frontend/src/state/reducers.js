import authReducer from './auth/reducers';
import planReducer from './plans/reducers';
import organizationReducer from './organization/reducers';

export default ({ auth, plans, organization }, action) => ({
  auth: authReducer(auth, action),
  plans: planReducer(plans, action),
  organization: organizationReducer(organization, action)
});