const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');
const jwt = require("jsonwebtoken");

module.exports = function(app){
  app.get('/api', UserController.index);

  app.post('/api/new/player', authenticate, UserController.createPlayer);
  app.get('/api/players', authenticate, UserController.getAllPlayers);
  app.delete('/api/player/:id/delete', authenticate, UserController.deletePlayer);

  app.delete('/api/delete/data', authenticate, UserController.deleteAllData);

  app.get('/api/user/:username', authenticate, UserController.getUser);
  app.put('/api/user/:id/update', authenticate, UserController.updateUser);
  app.delete('/api/user/:id/delete', authenticate, UserController.deleteUser);

  app.post("/api/register", UserController.createUser);
  app.post("/api/login", UserController.login);

  app.post("/api/logout", UserController.logout);
  // this route now has to be authenticated
  app.get("/api/user", authenticate, UserController.getAllUser);

  app.get('/test/cookie', function (request, response) {
    const userToken = jwt.sign({
        id: "007"
      }, process.env.SECRET_KEY);

    response.cookie('JWT', userToken, {
      maxAge: 86_400_000,
      httpOnly: true
    });
    response.send('Cookie has been send with the response');
    console.log(response)
  });

  app.post('/test/send-cookie', function(request, response) {
    console.log(response.socket);
  });
}
