const privateRoutes = {
  'GET /users': 'UserController.getAll',
  'GET /user': 'UserController.getUserDetail',
  'GET /users/activities': 'UserController.getUserActivities',
  'POST /activity': 'ActivityController.createActivity',
  'POST /note': 'NoteController.createNote',
};

module.exports = privateRoutes;
