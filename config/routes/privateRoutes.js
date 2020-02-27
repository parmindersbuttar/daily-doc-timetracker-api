const privateRoutes = {
  "GET /users": "UserController.getAll",
  "GET /user": "UserController.getUserDetail",
  "GET /users/activities": "UserController.getUserActivities",
  "POST /activity": "ActivityController.createActivity",
  "POST /note": "NoteController.createNote",
  "POST /customer": "PaymentController.createCustomer",
  "POST /toggle-subscription": "PaymentController.toggleSubscription"
};

module.exports = privateRoutes;
