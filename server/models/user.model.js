const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({

  id: {type: Number},
  favStats: { type: Object },
  favInfo: { type: Object }

}, { timestamps: true });

module.exports.Player = mongoose.model('Player', PlayerSchema);
