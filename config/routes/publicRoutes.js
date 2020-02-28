const publicRoutes = {
  "POST /user": "UserController.register",
  "POST /register": "UserController.register", // alias for POST /user
  "POST /login": "UserController.login",
  "POST /validate": "UserController.validate",
  "GET /plans": "PlanController.getAll",
  "POST /plan": "PlanController.createPlan",
  "POST /recover-password": "UserController.recoverPassword",
  "POST /reset-password": "UserController.resetPassword",
  "POST /webhook-charge": "PaymentController.stripePaymentEvents",
};

module.exports = publicRoutes;
