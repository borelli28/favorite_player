const UserController = require('../controllers/user.controller');

module.exports = function(app){
  app.get('/api', UserController.index);
  app.post('/api/user/new', UserController.createUser);
	app.get('/api/user', UserController.getAllUser);
	app.get('/api/user/:id', UserController.getUser);
  app.put('/api/user/:id/update', UserController.updateUser);
  app.delete('/api/user/:id/delete', UserController.deleteUser);
}
