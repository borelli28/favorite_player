const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');
const jwt = require("jsonwebtoken");
// allowed application to access env folder - environment variables(secret variables)
require('dotenv').config();

module.exports = function(app){
  app.get('/api', UserController.index);

  app.post('/api/new/player', authenticate, UserController.createPlayer);
  app.get('/api/players', authenticate, UserController.getAllPlayers);
  app.delete('/api/player/:id/delete', authenticate, UserController.deletePlayer);

  app.delete('/api/delete/data', authenticate, UserController.deleteAllData);

  app.get('/api/user/', authenticate, UserController.getUser);
  app.put('/api/user/:id/update', authenticate, UserController.updateUser);
  app.delete('/api/user/:id/delete', authenticate, UserController.deleteUser);

  app.post("/api/register", UserController.createUser);
  app.post("/api/login", UserController.login);

  app.post("/api/logout", UserController.logout);
  // this route now has to be authenticated
  app.get("/api/users", authenticate, UserController.getAllUser);

  app.get('/test/cookie', function (request, response) {
    // const userToken = jwt.sign({
    //     id: user._id
    //   }, process.env.SECRET_KEY);
    //
    // response.cookie('usertoken', userToken, process.env.SECRET_KEY, {
    //   maxAge: 86_400_000,
    //   httpOnly: true
    // });
    // response.send('Cookie has been send with the response');
    // console.log(response)
  });

  app.post('/test/send-cookie', authenticate, function(request, response) {
    console.log("cookies sent:");

    res = response.socket;

    for (cookie in res._httpMessage.req.cookies) {
      console.log("Cookie: " + cookie)
      console.log("Value: " + res._httpMessage.req.cookies[cookie])
    }

    console.log("leaving send cookie route");
  });
}
