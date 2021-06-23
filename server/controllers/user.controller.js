const { User } = require('../models/user.model');
const { Player } = require('../models/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports.index = (request, response) => {
  response.json({
    message: "Hello World"
  });
}

module.exports.createPlayer = (request, response) => {
  Player.create(request.body)
    .then(player => {
      response.json({ msg: "success!", player: player })
    })
    .catch(err => response.json(err));
}

module.exports.getAllPlayers = (request, response) => {
  Player.find({})
        .then(player => response.json(player))
        .catch(err => response.json(err))
}

module.exports.deletePlayer = (request, response) => {
  Player.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
        console.log("player deleted in controller");
}

module.exports.deleteAllData  = (request, response) => {
  Player.deleteMany({}, function(err) {
    if (err) {
      response.status(500).send({error: "could not clear database"});
    } else {
      response.status(200).send({message: "All data was cleared in database"});
    }
  });
  User.deleteMany({}, function(err) {
    if (err) {
      response.status(500).send({error: "could not clear database"});
    } else {
      response.status(200).send({message: "All data was cleared in database"});
    }
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
      response.cookie("usertoken", userToken, process.env.SECRET_KEY, { httpOnly: true }).json({ msg: "success!", user: user });
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

  // if we made it this far, the password was correct
  // also this piece of code create a jsonwebtoken(an object that can be send in a cookie)
  const userToken = jwt.sign({
    id: user._id
  }, process.env.SECRET_KEY);

  // note that the response object allows chained calls to cookie and json
  response.cookie("usertoken", userToken, process.env.SECRET_KEY, { httpOnly: true }).json({ msg: "success!" });

  console.log("leaving login method");
}
module.exports.getAllUser = (request, response) => {
    User.find({})
        .then(user => response.json(user))
        .catch(err => response.json(err))
}
module.exports.getUser = (request, response) => {
    User.findOne({username: request.params.username})
        .then(user => response.json(user))
        .catch(err => response.json(err))
}
module.exports.updateUser = (request, response) => {
    User.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedUser => response.json(updatedUser))
        .catch(err => response.json(err))
}
module.exports.deleteUser = (request, response) => {
    User.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}
