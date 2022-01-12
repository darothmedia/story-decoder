const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: false
  },
  emoji: {
    type: String,
    required: false
  }
}, {
  timestamps: true
})

module.exports = User = mongoose.model('User', UserSchema)