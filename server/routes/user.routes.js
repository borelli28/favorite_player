const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');
const jwt = require("jsonwebtoken");
// allowed application to access env folder - environment variables(secret variables)
require('dotenv').config();

module.exports = function(app){
  app.get('/api', UserController.index);

  app.get('/api/user', authenticate, UserController.getUser);
  app.put('/api/user/:id/update', authenticate, UserController.updateUser);
  app.delete('/api/user/:id/delete', authenticate, UserController.deleteUser);

  app.post("/api/register", UserController.createUser);
  app.post("/api/login", UserController.login);

  app.post("/api/logout", UserController.logout);
  // this route now has to be authenticated
  app.get("/api/users", authenticate, UserController.getAllUser);
  app.delete('/api/delete/all/users', UserController.deleteAllUsers);
}
