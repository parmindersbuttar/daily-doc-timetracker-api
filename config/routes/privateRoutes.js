const privateRoutes = {
  "GET /users": "UserController.getAll",
  "GET /user": "UserController.getUserDetail",
  "GET /users/activities": "UserController.getUserActivities",
  "POST /activity": "ActivityController.createActivity",
  "POST /note": "NoteController.createNote",
  "POST /plan": "PlanController.createPlan",
};

module.exports = privateRoutes;
