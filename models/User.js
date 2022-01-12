const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  emoji: {
    type: String
  }
}, {
  timestamps: true
})

module.exports = User = mongoose.model('User', UserSchema)