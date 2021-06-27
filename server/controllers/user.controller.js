const { User } = require('../models/user.model');
const { Player } = require('../models/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
let mongoose = require('mongoose');
// allowed application to access env folder - environment variables(secret variables)
require('dotenv').config();
// necessary to get rid of deprecation warning in: findOneAndUpdate() method. https://mongoosejs.com/docs/deprecations.html#findandmodify
mongoose.set('useFindAndModify', false);

module.exports.index = (request, response) => {
  response.json({
    message: "Hello World"
  });
}

module.exports.createUser = (request, response) => {
  User.create(request.body)
    .then(user => {
      console.log("user id thingy");
      const userToken = jwt.sign({
        id: user._id
      }, process.env.SECRET_KEY);
      // the usertoken cookie will log the user automatically
      console.log("cookie thingy");
      // name of cookie, cookie value, secret key, httponly(dont show to javascript)
      response.cookie('usertoken', userToken, process.env.SECRET_KEY, {
        httpOnly: true
      });
      console.log("user created:")
      console.log(user)
    })
    .catch(err => {
      console.log("user could not be created");
      response.json(err);
    })
}
module.exports.login = async(request, response) => {
  console.log("inside login method in controller");

  // find user by username
  const user = await User.findOne({ username: request.body.username });
  console.log("user:");
  console.log(user)

  if(user === null) {
    console.log("user not found in db")
    // username not found in users collection
    return response.sendStatus(400);
  }

  // if we made it this far, we found a user with this username
  // let's compare the supplied password to the hashed password in the database
  const correctPassword = await bcrypt.compare(request.body.password, user.password);

  if(!correctPassword) {
    // password wasn't a match!
    console.log("password does not match")
    return response.sendStatus(400);
  }

  // creates a jsonwebtoken(an object that can be send in a cookie)
  const userToken = jwt.sign({
    id: user._id
  }, process.env.SECRET_KEY);

  // name of cookie, cookie value, secret key, httponly(dont show to javascript)
  response.cookie('usertoken', userToken, process.env.SECRET_KEY, {
    httpOnly: true
  });
  response.send("Cookie created: " + userToken);

  console.log("leaving login method");
}
module.exports.logout = (request, response) => {
  response.clearCookie("usertoken");
  response.sendStatus(200);
  response.json({ msg: "Auth cookie deleted!" })
}
module.exports.getUser = (request, response) => {
  User.findOne({_id: process.env.LOGGED_USER_ID })
    .then(user => {
      response.status(200)

      response.send(user)
    })
    .catch(err => {
      console.log(err)
      console.log("Probably, a user was not found with that ID")
      response.json(err)
    })
}
module.exports.getAllUser = (request, response) => {
  User.find({})
    .then(users => {
      response.status(200)
      response.send(users)
    })
    .catch(err => {
      console.log(err)
      response.json(err)
    })
}
module.exports.updateUser = (request, response) => {
                        // new: true -> make the function return the updated object: https://mongoosejs.com/docs/tutorials/findoneandupdate.html
    User.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedUser => response.json(updatedUser))
        .catch(err => response.json(err))
}
module.exports.deleteUser = (request, response) => {
    User.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}
module.exports.deleteAllUsers  = (request, response) => {
  console.log("inside delete data method in controller");
  try {
    User.deleteMany({}, function(error) {
      if (error) {
        response.sendStatus(500);
        return;
      } else {
        response.status(200).send({message: "All users cleared from database"});
        console.log("Users schema cleared");
      }
    });
  } catch(error) {
    // response.status(201).send({error: `An error occured while trying to cleared DB: ${error}`})
    console.log(`An error occured while trying to cleared DB: ${e}`);
    logMyErrors(e);
    return;
  }
}
