const { User } = require('../models/user.model');
const { Player } = require('../models/user.model');

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
}

module.exports.createUser = (request, response) => {
    const { username, password } = request.body;
    User.create({
        username,
        password
    })
        .then(user => response.json(user))
        .catch(err => response.json(err));
}
module.exports.getAllUser = (request, response) => {
    User.find({})
        .then(user => response.json(user))
        .catch(err => response.json(err))
}
module.exports.getUser = (request, response) => {
    User.findOne({_id:request.params.id})
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
