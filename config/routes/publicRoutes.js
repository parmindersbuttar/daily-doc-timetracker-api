const publicRoutes = {
  "POST /user": "UserController.register",
  "POST /register": "UserController.register", // alias for POST /user
  "POST /login": "UserController.login",
  "POST /validate": "UserController.validate",
  "GET /plans": "PlanController.getAll",
  "POST /recover-password": "UserController.recoverPassword",
  "POST /reset-password": "UserController.resetPassword"
};

module.exports = publicRoutes;
