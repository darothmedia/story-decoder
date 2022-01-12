const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = require('./User').schema

const StorySchema = new Schema({
  writers: {
    type: [UserSchema],
    required: true
  },
  codedStory: {
    type: String,
    required: true
  },
  decodedStory: {
    type: String,
    required: true
  }
})

module.exports = Story = mongoose.model('Story', StorySchema)