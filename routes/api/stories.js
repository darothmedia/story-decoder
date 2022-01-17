const express = require('express');
const router = express.Router();
const Story = require('../../models/Story')


router.get('/', (req, res) => res.json({
  message: 'You are now at the story route'
}));

// Create a Story
router.post('/create', (req, res) => {

  Story.findOne({storyID: req.body.storyID})
    .then(story => {
      if (story) {
        return res.status(400).json({ game: "Duplicate Story Code" })
      } else {
        const newStory = new Story({
          writers: {
            creator: req.body.currentUser,
            contributors: [req.body.currentUser] 
          },
          codedStory: "",
          decodedStory: "",
          storyID: req.body.storyID
        })

        newStory.save()
          .then(story => res.json(story))
          .catch(err => res.status(400).json({
            message: "Houston, we've got a problem",
            error: err
          }))
      }
    })
})

// Add to a story
router.patch('/continue', (req, res) => {
  Story.findOne({storyID: req.body.storyID})
    .then (story => {
      let authors = story.writers.contributors
      if (!story) {
        return res.status(404).json({ game: "Story not found!" })
      } else {
        if (!authors.includes(req.body.currentUser)) {
          authors.push(req.body.currentUser)
        }
        story.codedStory += req.body.emojis;
        story.decodedStory += req.body.text;
        story.save()
      }
    })
})

module.exports = router