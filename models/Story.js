const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = require('./User').schema

const StorySchema = new Schema({
  writers: {
    type: Array
  },
  codedStory: {
    type: String
  },
  decodedStory: {
    type: String
  },
  storyID: {
    type: String,
    required: true
  }
})

module.exports = Story = mongoose.model('Story', StorySchema)