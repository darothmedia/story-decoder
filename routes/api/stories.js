const express = require('express');
const router = express.Router();
const Story = require('../../models/Story')


router.get('/', (req, res) => {
  Story
    .find()
    .sort({date: -1})
    .then(stories => res.json(stories))
    .catch(err => res.status(400).json(err))
});

router.get('/:story_id', (req, res) => {
  Story
    .find({storyID: req.params.story_id})
    .then(story => res.json(story))
    .catch(err => res.status(400).json(err))
})

// Create a Story
router.post('/create', (req, res) => {

  Story.findOne({storyID: req.body.storyID})
    .then(story => {
      if (story) {
        return res.status(400).json({ game: "Duplicate Story Code" })
      } else {
        const newStory = new Story({
          writers: [],
          codedStory: "",
          decodedStory: "",
          storyID: req.body.storyID
        })

        newStory.writers.push(req.body.currentUser)

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
router.patch('/:story_id/continue', (req, res) => {
  Story.findOne({storyID: req.params.story_id})
    .then (story => {
      if (!story) {
        return res.status(404).json({ game: "Story not found!" })
      }
      else {
        const authors = story.writers
        if (!authors.includes(req.body.currentUser)) {
          authors.push(req.body.currentUser)
        }
        story.codedStory += req.body.emojis
        story.decodedStory += req.body.text
        story.save()
          .then(updatedStory => res.json(updatedStory))
          .catch(err => console.log(err))
      }
    })
    .catch(err => res.status(400))
})




module.exports = router