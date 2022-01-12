const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Users = require('./User')

const StorySchema = new Schema({
  writers: {
    type: [Users],
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