const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = function(app){
  app.get('/api', UserController.index);

  app.post('/api/new/player', UserController.createPlayer);
  app.get('/api/players', UserController.getAllPlayers);
  app.delete('/api/player/:id/delete', UserController.deletePlayer);

  app.delete('/api/delete/data', UserController.deleteAllData);

  app.get('/api/user/:id', UserController.getUser);
  app.put('/api/user/:id/update', UserController.updateUser);
  app.delete('/api/user/:id/delete', UserController.deleteUser);

  app.post("/api/register", UserController.createUser);
  app.post("/api/login", UserController.login);
  // this route now has to be authenticated
  app.get("/api/user", authenticate, UserController.getAllUser);
}
