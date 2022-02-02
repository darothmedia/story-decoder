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
    .findOne({storyID: req.params.story_id})
    .then(story => {
      if(!story) {
        return res.status(404).json({story: "No Story Found"})
      } else {
        return res.json(story)
      }
    })
    .catch(err => res.status(400).json(err.response.data))
})

// Create a Story
router.post('/create', (req, res) => {

  Story.findOne({storyID: req.body.storyID})
    .then(story => {
      if (story) {
        return res.status(400).json({ story: "Duplicate Story Code" })
      } else {
        const newStory = new Story({
          writers: req.body.writers,
          codedStory: [],
          decodedStory: [],
          storyID: req.body.storyID,
          title: req.body.title,
          creator: req.body.creator
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
router.patch('/:story_id/continue', (req, res) => {
  Story.findOne({storyID: req.params.story_id})
    .then (story => {
      if (!story) {
        return res.status(404).json({ game: "Story not found!" })
      }
      else {
        story.codedStory.push(req.body.selected)
        // story.decodedStory += req.body.text
        story.save()
          .then(updatedStory => res.json(updatedStory))
          .catch(err => console.log(err))
      }
    })
    .catch(err => res.status(400))
})

module.exports = router