const UserController = require('../controllers/user.controller');

module.exports = function(app){
  app.get('/api', UserController.index);
  app.post('/api/new/player', UserController.createPlayer);
  app.get('/api/players', UserController.getAllPlayers);
  app.delete('/api/player/:id/delete', UserController.deletePlayer);
  app.delete('/api/delete/data', UserController.deleteAllData);
}
