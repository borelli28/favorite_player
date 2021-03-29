const { User } = require('../models/user.model');

module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    });
}
module.exports.createUser = (request, response) => {
    const { email, password } = request.body;
    User.create({
        email,
        password
    })
        .then(user => response.json(user))
        .catch(err => response.json(err));
}
module.exports.getAllUser = (request, response) => {
    User.find({})
        .then(user => response.json(user))
        .catch(err => response.json(err))
}
module.exports.getUser = (request, response) => {
    User.findOne({_id:request.params.id})
        .then(user => response.json(user))
        .catch(err => response.json(err))
}
module.exports.updateUser = (request, response) => {
    User.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedUser => response.json(updatedUser))
        .catch(err => response.json(err))
}
module.exports.deleteUser = (request, response) => {
    User.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}

// register: (req, res) => {
//   User.create(req.body)
//     .then(user => {
//         res.json({ msg: "success!", user: user });
//     })
//     .catch(err => res.json(err));
// }
