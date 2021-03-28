const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    });
});

const UserSchema = new mongoose.Schema({
    email: { type: String, required: [true, "Email is required"], minLength: [5, "Email should be at least 5 characters"], validate: { validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val), message: "Please enter a valid email" } },
    password: { type: String, required: [true, "Password is required"], minLength: [8, "Password should be at least 8 characters long"] },
    fav_players: [{ name: { type: String }, info: { type: String } }],
    oneFavPlayer: { name: { type: String }, info: { type: String }

}, { timestamps: true });

UserSchema.virtual('confirmPassword')
  .get( () => this._confirmPassword )
  .set( value => this._confirmPassword = value );

UserSchema.pre('validate', function(next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Password must match confirm password');
  }
  next();
});

module.exports.User = mongoose.model('User', UserSchema);
