const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const PlayerSchema = new mongoose.Schema({
  // name of the user that added this player
  username: String,
  id: {type: Number},
  favStats: { type: Object },
  favInfo: { type: Object }
}, { timestamps: true });
module.exports.Player = mongoose.model('Player', PlayerSchema);


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    minLength: [3, "Username should be at least 3 characters"],
    trim: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be 8 characters or longer"],
    trim: true
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player"
    }
  ]
}, {timestamps: true});

  // use mongoose virtual to compare confirm password with password since confirm password is not save to the DB
  UserSchema.virtual('confirmPassword')
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value );

  // check that confirm password match with password
  UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
      this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    console.log("password and confirm password validated");
    next();
  });

  UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
      .then(hash => {
        this.password = hash;
        next();
      });
      console.log("password hashed");
  });

module.exports.User = mongoose.model('User', UserSchema);
