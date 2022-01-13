const express = require('express');
const router = express.Router();
const Story = require('../../models/Story')
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys')
const passport = require('passport')


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
            contributors: [] 
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

module.exports = router