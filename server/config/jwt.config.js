const jwt = require("jsonwebtoken");
// allowed application to access env folder - environment variables(secret variables)
require('dotenv').config();

// basically check that there is data in usertoken cookie(which tell us that there is a logged user),
//  if not it returns a 401 status code to the front end
module.exports.authenticate = (request, response, next) => {
  console.log("in authenticate method controller");
  console.log(request.cookies);

  jwt.verify(request.cookies.usertoken, process.env.SECRET_KEY, (err, payload) => {
    if (err) {
      console.log(err)
      response.status(401).json({verified: false});
    } else {
      console.log("user authenticated using jwt");
      next();
    }
  });
  console.log("leaving authenticate");
}
