const jwt = require("jsonwebtoken");
// allowed application to access env folder - environment variables(secret variables)
require('dotenv').config();

// basically check that there is data in usertoken cookie(which tell us that there is a logged user),
//  if not it returns a 401 status code to the front end
module.exports.authenticate = (request, response, next) => {
  console.log("in authenticate method controller");
  console.log(request.cookies);

  // verify(token template(token to verify), secret template(secret key used to sign the token))
  // if JWT is valid, a payload(token content) is issued
  jwt.verify(request.cookies.usertoken, process.env.SECRET_KEY, (err, payload) => {

    if (err) {
      console.log(err)
      response.status(401).json({verified: false});

    } else {
      console.log("user authenticated using jwt");

      // saves the user id in env for further use(like: getting use info and user favorite players).
      process.env.LOGGED_USER_ID = payload.id;

      next();
    }
  });
  console.log("leaving authenticate");
}
