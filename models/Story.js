const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StorySchema = new Schema({
  writers: {
    type: Array
  },
  codedStory: {
    type: Array
  },
  decodedStory: {
    type: Array
  },
  storyID: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  creator: {
    type: String
  }
})

module.exports = Story = mongoose.model('Story', StorySchema)