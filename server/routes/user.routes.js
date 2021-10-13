const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');
const jwt = require("jsonwebtoken");
const rateLimiter = require('express-rate-limit');
// allowed application to access env folder - environment variables(secret variables)
require('dotenv').config();

const playerRateLimiter = rateLimiter({
  windowMS: 1 * 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 request per windowMS
  // onLimitReached: function(req, res) {
  //   console.log("Limit Reached!")
  // }
});

module.exports = function(app){
  app.get('/api', UserController.index);

  app.get('/api/user', authenticate, UserController.getUser);
  app.put('/api/user/:id/update', authenticate, playerRateLimiter, UserController.updateUser);
  // app.delete('/api/user/:id/delete', authenticate, UserController.deleteUser);

  app.post("/api/register", UserController.createUser);
  app.post("/api/login", UserController.login);

  app.get("/api/logout", UserController.logout);
  // this route now has to be authenticated
  app.get("/api/users", authenticate, UserController.getAllUser);
  // app.delete('/api/delete/all/users', UserController.deleteAllUsers);
}
