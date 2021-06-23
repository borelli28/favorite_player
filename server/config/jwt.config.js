const jwt = require("jsonwebtoken");

// basically check that there is data in usertoken cookie(which tell us that there is a logged user),
//  if not it returns a 401 status code to the front end
module.exports.authenticate = (request, response, next) => {
  jwt.verify(request.cookies.usertoken, process.env.SECRET_KEY, (err, payload) => {
    if (err) {
      response.status(401).json({verified: false});
    } else {
      console.log("user authenticated using jwt");
      next();
    }
  });
}
