const checkIfOrganization = require('../../api/policies/organization.policy');
const privateRoutes = {
  "GET /users": "UserController.getAll",
  "GET /user": "UserController.getUserDetail",
  "GET /users/activities": "UserController.getUserActivities",
  "POST /activity": "ActivityController.createActivity",
  "POST /note": "NoteController.createNote",
  "POST /customer": "PaymentController.createCustomer",
  "POST /toggle-subscription": "PaymentController.toggleSubscription",
  "GET /organization/users": {
    path: 'OrganizationController.get',
    middlewares: [checkIfOrganization],
  },
  "GET /organization/users/:userId": {
    path: 'OrganizationController.show',
    middlewares: [checkIfOrganization],
  },
  "POST /organization/users": {
    path: 'OrganizationController.create',
    middlewares: [checkIfOrganization]
  },
  "PATCH /organization/users/:userId": {
    path: 'OrganizationController.update',
    middlewares: [checkIfOrganization]
  },
  "DELETE /organization/users/:userId": {
    path: 'OrganizationController.destroy',
    middlewares: [checkIfOrganization]
  },
};

module.exports = privateRoutes;
